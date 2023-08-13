const Joi = require('joi');
const registration = (userData) =>{
    const inputValidity = Joi.object({
        fullname: Joi.string().min(5).required(),
        email: Joi.string().min(5).required(),
        password: Joi.string().min(5).required(),
    })  
    return inputValidity.validate(userData);
}
const login = (userData) =>{
    const inputValidation = Joi.object({
        email: Joi.string().min(5).required(),
        password: Joi.string().min(5).required(),
    })
    return inputValidation.validate(userData);
} 


 




module.exports = {registration,login}