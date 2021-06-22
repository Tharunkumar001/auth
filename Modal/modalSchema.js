const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    email: {
        type: String
    },

    password: {
        type: String
    },

    phone: {
        type: String
    },
})

var Auth = mongoose.model("auth", authSchema);

module.exports = Auth;