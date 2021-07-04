
const config = import('config');
const express = import('express');
const router = express.router();

router.get('/', (req, res) => {
    const token = req.header(config.get('jwtHeader'));
    if (!token) res.send("Login or Register");

    try{
        req.body = jwt.verify(token, config.get('jwtPrivateKey'));
        res.redirect('./account');
    }
    catch(ex){
        res.status(400).send("Invalid token");
    }
})

module.exports = router;