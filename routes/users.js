const express = require('express');
const router = express.Router();
const Ajv = require('ajv');
const userModel = require('../model/Users');
const userSchema = require('../schemas/userSchema');
const ajv = new Ajv();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/registration', async function(req, res, next) {
    const{firstName,lastName, email, password, dob, phone}=req.body;
    // console.log(req.body);
    const validate = ajv.compile(userSchema);
    const valid = validate({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        dob:dob,
        phone:phone
    });
    if(!valid){
        const { errors } = validate;
        const result = {
            status: 'invalid data',
            payload: { errors },
        };
        console.log(result.payload.errors);
        await res.json(result);
    } else {
        const User = new userModel({
                firstName: firstName,
                lastName: lastName,
                email: email,
                dob:dob,
                phone:phone
            });
        User.password = await User.setPassword(password);
        console.log(await User.setPassword(password)+'setPassword');
        await User.save()
            .then(data => {
                console.log(data+'SAVE');
                res.json(JSON.stringify(data))
            })
            .catch((err) => console.log(err));    }
});


router.post('/login', async function(req, res, next) {

    // jwt.sign(req.body, 'privateKey', { algorithm: 'RS256' }, function(err, token) {
    //     console.log(token);
    //     res.json({
    //         token:token
    //     });
    //     console.log(token);
    // });

    const{firstName,password}=req.body;
    // function comparePwd(loginPwd,dbPwd) {
    //     if (loginPwd.split("").reverse().join("") === dbPwd) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    //
    await userModel.findOne({firstName:firstName})
        .then(data=>{
            if(data) {
                return data
               // if (comparePwd(password, data.password)){
               // } else {
               //     res.json(JSON.stringify({massage:'PWDs not match!'}));
               // }
            } else {
                res.json(JSON.stringify({massage:'You need registration'}));
            }
        })
        .then(data=>{
            // console.log(a);

            return  data.comparePassword(password);
            // if(data.comparePassword(password)){
            //     console.log('DATA111'+data);
            //     res.json(JSON.stringify(data));
            //
            // }

    }).then(data=>{
        console.log(data);
        });
});




module.exports = router;


// let saltRounds = 10;
// bcrypt.genSalt(saltRounds,function (err,salt) {
//     console.log(salt);
//     bcrypt.hash(password, salt, function (err, hash) {
//         console.log('HASH:'+hash);
//     })
// });