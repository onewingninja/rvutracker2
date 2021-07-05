
const Joi = import('joi');

module.exports = async function(value, schema){
    try{
        return await schema.validateAsync(value);  
    }
    catch(error){
        return error;
    }
}