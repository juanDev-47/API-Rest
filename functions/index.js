const express = require('express');
const app = express();
const morgan = require('morgan');
const serverless = require('serverless-http');


// configuraciones
app.set('port', process.env.PORT || 3000);  // se crea una instancia del puerto para usarlo al levantar el servidor, el metodo precess.env.PORT se implementa por si nuestra app fuera a ser usada mediante servicios como azure o aws los cuales determinan un puerto ellos mismos, con esto estamos aceptando un puerto si asi se requiere y sino usar por defecto el 3000
app.set('json spaces', 2);

// middlewares

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));   // soportar archivos tipo html, no pesados
app.use(express.json()); // con este metodo logramos que express reciba los formatos json y los procese 

// routes
app.use(require('../src/routes/index'));
app.use('/.netlify/functions/api/movies',require('../src/routes/movies'));  // con esto ejecutamos la ruta de movies.js 
app.use('/.netlify/functions/api/users', require('../src/routes/users'))


// starting the server 
app.listen(app.get('port'), () =>{
     console.log(`Server on port ${app.get('port')}`);
});


module.exports.handler = serverless(app);