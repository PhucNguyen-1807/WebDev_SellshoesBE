const Joi = require('joi');
const createError = require('http-errors');

const authValidate = (schema) => (req, res, next) => {
    try {
        const result = schema.validate(req.body);
    
        if(result.error) {
            throw new createError(400, result.error.details[0].message);
        }
        return next();
    } catch (error) {
        next(error);
    }
}   
const schema = {
    register: Joi.object({
        email: Joi.string().email().min(10).required(),
        password: Joi.string().min(5).required(),
        phone: Joi.number().required(),
        address: Joi.string().required(),
        fullname: Joi.string().min(5).max(30).required(),
        role: Joi.bool(),
    }), 
    login: Joi.object({
        email: Joi.string().email().min(10).required(),
        password: Joi.string().min(5).required()
    })
}

module.exports = {
    authValidate,
    schema
}