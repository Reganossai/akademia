const mongoose = require("mongoose");

const userData = mongoose.Schema({
    firstname : {
        type: String,

    },
    email : {
        type:String
    },
    password : {
        type:String
    }
})


module.exports = mongoose.model("table", userData)