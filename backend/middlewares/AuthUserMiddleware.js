const joi = require('joi');
const express = require('express');


const signupValidation = (req,res,next) => {
    const schema = joi.object({
        name: joi.string().min(3).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).max(20).required(),
        role: joi.string().valid('user', 'admin').default('user')
    });
    const {error} = schema.validate(req.body);
    if (error) {
        return res.status(400).json({error: error.details[0].message});
    }
    
    next();
}

const loginValidation = (req,res,next) => {
    const schema = joi.object({
        role: joi.string().valid('user', 'admin').default('user'),
        email: joi.string().email().required(),
        password: joi.string().min(6).max(20).required()
    });
    const {error} = schema.validate(req.body);
    if (error) {
        return res.status(400).json({error: error.details[0].message});
    }
    next();
}

const logoutValidation = (req,res,next) => {
    const schema = joi.object({
        role: joi.string().valid('user', 'admin').default('user'),
        email: joi.string().email().required(),
        password: joi.string().min(6).max(20).required()
    });
    const {error} = schema.validate(req.body);
    if (error) {
        return res.status(400).json({error: error.details[0].message});
    }
    next();
}

module.exports = {
    signupValidation,
    loginValidation,
    logoutValidation
}