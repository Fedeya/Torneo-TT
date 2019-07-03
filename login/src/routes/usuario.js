const { Router } = require("express");
const Usuario = require("../model/usuario");
const path = require("path");

const router = Router();

router.get("/usuario/:id", (req, res) => {

    Usuario.findById(req.params.id, (err, usuario) => {

        res.render(path.join(__dirname, "../views/usuario"),{
            name: usuario.name,
            lastname: usuario.lastname,
            email: usuario.email
        })    
    })

})

module.exports = router;