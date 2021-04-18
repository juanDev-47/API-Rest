// usando el modulo node-fetch para exponer una api y consumirla

const {Router} = require('express');
const router = Router();

const fetch = require('node-fetch');

router.get('/', async (req, res) =>{
     const response = await fetch('https://jsonplaceholder.typicode.com/todos'); // recibimos la respuesta desde la api  https://jsonplaceholder.typicode.com/todos/1
     const users = await response.json(); // convertimos la peticion en formato json para poder procesarlo
     res.json(users);
});

module.exports = router;