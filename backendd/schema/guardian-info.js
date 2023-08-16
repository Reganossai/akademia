const mongoose = require("mongoose");

const guardianInformation = mongoose.Schema({
    guardianFirstName : {
        type: String,

    },
    guardianLastName : {
        type:String
    },
    relationship : {
        type:String
    },
    guardianEmail : {
        type:String
    },
    guardianPhone: {
        type:String
    },
    nationality : {
        type:String
    },
    guardianAddress : {
        type:String
    },
    occupation : {
        type:String
    },
})


module.exports = mongoose.model("tableThree", guardianInformation)