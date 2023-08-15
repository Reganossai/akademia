const mongoose = require("mongoose");

const userData = mongoose.Schema({
    fullname : {
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