const express = require('express');
const router = express.Router();
const Ajv = require('ajv');
const UserModel = require('../model/userModel');
const {registerValidation, loginValidation} = require('../schemas/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/registration', async function(req, res, next) {
    const{firstName, email, password}=req.body;

    const user = new UserModel({
        firstName: firstName,
        email: email,
    });
    user.password = await user.setPassword(password);

    const ajv = new Ajv();
    const validate = ajv.compile(registerValidation);
    const valid = validate(req.body);
    const { errors } = validate;

    if(!valid) return  res.status(400).send(errors);

    const emailExist = await UserModel.findOne({email});
    if(emailExist) return res.status(400).send('Email already exist');

    try {
        const savedUser = await user.save();
        await res.send(savedUser);
    }catch (e) {
        res.status(400).send(e);
    }
});


router.post('/login', async function(req, res, next) {
    console.log(req.body);
    const{email,password}=req.body;
    const ajv = new Ajv();
    const validate = ajv.compile(loginValidation);
    const valid = validate(req.body);
    const { errors } = validate;

    if(!valid) return  res.status(400).send(errors);

    const userExist = await UserModel.findOne({email});
    if(!userExist) return res.status(400).send('Email was found, try again');

    const validPassword = await bcrypt.compare(password, userExist.password);
    if(!validPassword) return res.status(400).send('Invalid password');

    const token = await jwt.sign({_id: userExist.id}, process.env.TOKEN_SECRET);
    await res.header('auth-token', token).json(token);
});


module.exports = router;


// const token = jwt.sign({_id: userExist.id});
// await res.header('auth-token', token).json(token);