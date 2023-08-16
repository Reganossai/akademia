const mongoose = require("mongoose");

const previousEducation = mongoose.Schema({
    name : {
        type:String
    },
    selectClass : {
        type:String
    },
    previousResult  : {
        type:String
    },
})


module.exports = mongoose.model("tableFour", previousEducation)