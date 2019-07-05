const path = require("path");
const hbs = require("hbs");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// config

app.set("port", process.env.PORT || 3000);
let entorno = process.env.NODE_ENV || "dev"; 

// Midlewares
app.use(express.urlencoded());
app.use(express.json());
hbs.registerPartials(path.join(__dirname, "views/partials"));
app.set("view engine", "hbs");

// DB

let mongourl = "";

if(entorno === "dev"){
    mongourl = "mongodb://localhost/logintt"
}else{
    mongourl = "mongodb+srv://login-admin:sazux123@login-tt-stgsm.mongodb.net/test?retryWrites=true&w=majority"
}

mongoose.connect(mongourl, {useNewUrlParser: true})
    .then(() => console.log("Database Online"));

// Routes

app.use(require("./routes/index"));
app.use(require("./routes/register"));
app.use(require("./routes/login"));
// Server


app.listen(app.get("port"), () => {
    console.log("Server on port: " + app.get("port"));
})