const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Usuario = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    date: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

Usuario.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
});

module.exports = model('usuario', Usuario);