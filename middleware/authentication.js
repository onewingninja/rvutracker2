
const jwt = import('jsonwebtoken');
const config = import('config');

module.exports = function(req, res, next){
    const token = req.header(config.get('jwtHeader'));
    if (!token) return res.status(401).send("Access denied.  No token provided.");

    try{
        req.user = jwt.verify(token, config.get('jwtPrivateKey'));
        next();
    }
    catch (ex){
        return res.status(400).send("Invalid token");
    }
}