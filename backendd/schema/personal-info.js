const mongoose = require("mongoose");

const personalInformation = mongoose.Schema({
    firstName : {
        type: String,

    },
    lastName : {
        type:String
    },
    otherName : {
        type:String
    },
    email : {
        type:String
    },
    phone : {
        type:String
    },
    gender : {
        type:String
    },
    address : {
        type:String
    },
    dob : {
        type:String
    },
    select : {
        type:String
    },
    picture:{
        type:String
    },
})


module.exports = mongoose.model("tableTwo", personalInformation)