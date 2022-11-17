// Importation de mongoose
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    }
})

// sécurité pour email unique
userSchema.plugin(uniqueValidator);

//export du module
const User = mongoose.model("User", userSchema);

module.exports = User;
