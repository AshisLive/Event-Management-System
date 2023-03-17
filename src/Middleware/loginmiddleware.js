var validator = require("email-validator");
const jwt = require("jsonwebtoken")
 
const emailValidator=async function(req,res,next){
    let Id=req.body.email
    if(Id === undefined || null){
        res.status(404).send('email is not there')
    }
    let Idd=validator.validate(Id);
    if(Idd){
        next();
    }else{
        res.status(404).send('Please give valid email')
    }
}

const activityToken = async function (req, res, next) {
    try {
        let token = req.header('Authorization', 'Bearer Token')
        token= token.split(' ')
        if (!token[0] && !token[1]) {
            return res.status(401).send({ status: false, msg: "no authentication token" })
        } else {
            
            let decodeToken = jwt.decode(token[1], 'user123')
            if (decodeToken) {
                req.userId = decodeToken.userId
                next()
            } else {
                res.status(401).send({ status: false, msg: "not a valid token" })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: error })
    }
}

module.exports = {activityToken, emailValidator}
