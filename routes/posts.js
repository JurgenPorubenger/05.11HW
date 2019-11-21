const express = require('express');
const router = express.Router();
const verify= require('./verifyToken');


router.post('/', verify, async function(req, res, next) {
    res.send(JSON.stringify(req.user))
    // res.json(JSON.stringify(req.body));
});

module.exports = router;
