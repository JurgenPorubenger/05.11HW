var express = require('express');
var router = express.Router();
const verify= require('./verifyToken');


router.post('/', verify, async function(req, res, next) {
    console.log(req.body)
    res.send(req.user)
    // res.json(JSON.stringify(req.body));
});

module.exports = router;
