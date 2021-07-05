
module.exports = function({error}, res){
    if (error) return res.status(400).send(error.details[0].message);
}