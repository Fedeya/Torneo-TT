const path = require("path");
const { Router } = require("express");
const Usuario = require("../model/usuario");

const router = Router();

router.get("/register", (req, res) => {

    error = req.query.error || 0;
    success = req.query.success || false;

    res.render(path.join(__dirname, "../views/register"), {
        register: "active",
        error,
        success
    });

})

router.post("/register", (req, res) => {

    let data = req.body;
    let password = data.password;
    let edad = data.date;

    año = new Date().getFullYear();

    edad = año - edad.split("-")[0];
    
    if(edad < 18 && password.length < 6){
        return res.redirect("/register?error=3")
    }
    else if(edad < 18){
        return res.redirect("/register?error=1")
    }
    else if(password.length < 6){
        return res.redirect("/register?error=2")
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
            
            res.redirect("/register?error=4");

            }else if(err) throw err;
        }
        catch{

            res.redirect("/register?success=true")

        }



    })

})


module.exports = router;