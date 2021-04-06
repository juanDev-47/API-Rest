// se crea una carpeta routes y se requiere el modulo Router para trabajar con las rutas de la API y se separa para mantener buenas practicas de desarrollo

const { Router} = require("express");
const router = Router();

router.get('/test', (req, res) => {     // podemos probar la ruta que sea para probar
     var data = {
          "name": "Juan Pablo",
          "nickname": "JuanDev47"
     };
     res.json({data});
});


module.exports = router;