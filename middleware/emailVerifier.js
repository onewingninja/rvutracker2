
const nodeMailer = import('nodemailer');
const config = import('config');
const logger = require('../middleware/logger.js');
const AppEventEmmiter = require('../middleware/AppEventEmmiter.js');
const emailEmmiter = new AppEventEmmiter();

module.exports = function(req){
    const transporter = nodeMailer.createTransport({
    service: config.get('mail.service'),
    auth: {
        user: config.get('mail.username'),
        pass: config.get('mail.password')
    }
});
    const code = Math.floor(100000 + Math.random * 900000);

    const mailSchema = {
        from: config.get('mail.username'),
        to: req.body.email,
        subject: `${config.get('name')} account email verification`,
        text: `${req.body.name}, your account verification code is ${code}.  
        If you do not recognize this, please disregard it as 
        someone may have mistyped and accidentally entered your email.`
    };

    try{
        transporter.sendMail(mailSchema, (err, info) => {
            if (err) throw err;
        });
    }
    catch(err){
        next(err);
    }
    
    function verifiedSuccess() {resolve(code)}

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            emailEmmiter.removeListener(code, verifiedSuccess);
            reject(new Error("Timeout on the email verification."));
        }, 3600000);
    
        emailEmmiter.once(code, verifiedSuccess);
    });

    return await promise;
}