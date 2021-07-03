
const config = import('config');

module.exports = function(){
    if (!config.get('jwtPrivateKey')) {
        throw new Error("FATAL ERROR: jwtPrivateKey is not defined (in either config or system variables).");
    }
}