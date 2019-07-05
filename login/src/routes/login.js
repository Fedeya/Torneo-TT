const path = require("path");
const { Router } = require("express");
const Usuario = require("../model/usuario");

const router = Router();

router.get("/login", (req, res) => {

    let error = req.query.error;

    res.render(path.join(__dirname, "../views/login"), {
        login: "active",
        error
    });

})

router.post("/login", (req, res) => {

    let data = req.body;

    Usuario.find({
        email: data.email,
        password: data.password
    }, (err, usuario) => {
        if (usuario.length === 1){
            res.render(path.join(__dirname , "../views/usuario"),{
                name: usuario[0].name,
                lastname: usuario[0].lastname,
                email: usuario[0].email
            });
        }else{
            res.render(path.join(__dirname, "../views/login"),{
                login: "active",
                error: 1
            });
        }
    });

})

module.exports = router;