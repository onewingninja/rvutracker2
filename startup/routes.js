
const logger = require('../middleware/logger.js');

module.exports = function(app){
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> logger.info(`Listening on port ${port}`));}