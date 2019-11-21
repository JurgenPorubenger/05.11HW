const jwt = require('jsonwebtoken');


module.exports =  function auth (req, res, next) {
    const access_token = req.cookies['access_token'];
    const refresh_token = req.cookies['refresh_token'];
    if(!access_token&&!refresh_token) {
        return res.status(401).send('Need Login');
    }
    if(!access_token&&refresh_token){
        jwt.verify(refresh_token, process.env.TOKEN_SECRET, function(err, decoded) {
            if (err) {
                console.log(err);
                res.status(400).json('Invalid Token')
            }
            req.user = decoded;
            next()
        });
    }
    jwt.verify(access_token, process.env.TOKEN_SECRET, function(err, decoded) {
        if (err) {
            console.log(err);
            res.status(400).json('Invalid Token')
        }
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