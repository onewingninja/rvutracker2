
module.exports = function(req, res, next){
    if (req.user.userId < 1) return res.status(403).send("Access denied.");

    next();
}