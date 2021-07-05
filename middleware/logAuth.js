
const {Joi} = import('express-validation');

module.exports = function(postData, user){

    const schema = new Joi.object({
        hospital: Joi.valid(user.hospitals)
    });

    return schema.validate(postData);
}