const path = require("path");
const { Router } = require("express");
const Usuario = require("../model/usuario");

const router = Router();

router.get("/register", (req, res) => {

    res.render(path.join(__dirname, "../views/register"), {
        register: "active",
        error: 0,
        success: false
    });

})

router.post("/register", (req, res) => {

    let data = req.body;
    let password = data.password;
    let edad = data.date;

    año = new Date().getFullYear();

    edad = año - edad.split("-")[0];

    if(edad < 18 || password.length < 6){

        let error;

        if(edad < 18 && password.length < 6){
            error = 3;
        }
        else if(edad < 18){
            error = 1;
        }
        else if(password.length < 6){
            error = 2;
        }

        return res.render(path.join(__dirname, "../views/register"), {
            register: "active",
            error,
            success: false
        });

    }

    let usuario = new Usuario({
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
        date: data.date
    });

    usuario.save((err, usuario) => {
        
        try {
            if(err.errors.email.message == "email debe de ser unico"){
            
                res.render(path.join(__dirname, "../views/register"), {
                    register: "active",
                    error: 4,
                    success: false
                });

            }else if(err) throw err;
        }
        catch{

            res.render(path.join(__dirname, "../views/register"), {
                register: "active",
                error: 0,
                success: true
            });
        }



    })

})


module.exports = router;