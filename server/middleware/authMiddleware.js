const jwt = require("jsonwebtoken");

module.exports = function(req,res,next){
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRATE);
        if(decoded.userId){
            req.body.userIdFromToken = decoded.userId;
            next();
        }
        else{
            return res.send({
                success: false,
                message: "Invalid token",
            })
        }
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        })
    }
}