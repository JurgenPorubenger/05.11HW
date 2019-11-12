const jwt = require('jsonwebtoken');


module.exports =  function auth (req, res, next) {
    const token = req.header('auth-token');
    console.log(token+'TOKEN');
    if(!token) return res.status(401).send('Access Denied');
    console.log(token+'TOKEN9999');
    jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
        if (err) {
            console.log(err);
            res.status(400).json('Invalid Token')
        }
        console.log(decoded);
        req.user = decoded;
        next()
    });
    // try {
    //     req.user =jwt.verify(token, process.env.TOKEN_SECRET);
    //     next()
    //     console.log(JSON.stringify(req.user)+'USER');
    //
    // } catch {e} {
    //     console.log(e+'ERROR');
    //     // res.json('Invalid Token')
    // }
    // next();
};