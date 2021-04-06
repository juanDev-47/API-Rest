const { Router, json } = require("express")
const router = Router();
const _ = require('underscore');

const movies = require('../sample.json');
// prueba por consola console.log(movies);

router.get('/', (req, res) =>{
     res.json(movies);
});  // vamos a enviar la peticion solicitando el json al archivo movies.js, ya en este punto estos datos pueden ser consumidos por una aplicacion web o movil.

router.post('/', (req, res) =>{
     const {title,director,year,rating} = req.body; // obtenemos los valores 
     if(title && director && year && rating) {  // mediante esta validacion estamos comprobando que si se recibieron todos los valores correctamente mediante el metodo req.body
          const id = movies.length + 1;
          const newMovie = {...req.body, id}; // con esto estamos pasando todo desde req.body a un nuevo objeto
          movies.push(newMovie);  // de esta forma guardamos en el arreglo movies la nueva pelicula
          res.json(movies);
     } else {
          res.send('wrong request');
     }
     res.send('recibido');
});

router.put('/:id', (req, res) =>{
     const {id} = req.params; // con esta variable estamos almacenando el id que llega como parametro por la url
     const {title,director,year,rating} = req.body; // aca almacenamos los valores del objeto json que recibimos
     if(title && director && year && rating){ // validamos la existencia de todos los datos
          _.each(movies, (movie, i) =>{
               if (movie.id == id){ // si mediante el recorrido encontramos el id solicitado, procedemos a realizar la actualizacion del objeto json
                    movie.title = title;
                    movie.director = director;
                    movie.year = year;
                    movie.rating = rating;
               }
          });
          res.json(movies);
     } else {
          res.status(500).json({error: 'hubo un error'})
     }
});

router.delete('/:id', (req, res) =>{
     const { id } = req.params;
     _.each(movies, (movie, i) =>{
          if (movie.id == id){
               movies.splice(i,1);
          }
     });
     res.send(movies);
})


module.exports = router;