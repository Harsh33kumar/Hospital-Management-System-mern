const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();
const ensureAuthenticated = (req,res,next)=>{
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(403)
        .json({message:'Unauthorization ,Jwt token is required'});

    }
    try{
        const decoded = jwt.verify(auth,process.env.JWT_SECRET);
        req.user=decoded;
        next();

    }
    catch(err){
        return res.status(403).json({
            message:'Unauthorized,JWT token wrong or expired'
        });
    }
}
module.exports = ensureAuthenticated;