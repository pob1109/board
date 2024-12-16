const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const errGenerator = require('../middleware/errGenerator');
dotenv.config();

async function readToken(req,res,next) {
    try{
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw errGenerator('로그인 상태가 아닙니다',401);
        }
        
        const token = authHeader.split(' ')[1];
        const verified = jwt.verify(token,process.env.KEY);
        req.user = verified.email;
        next();

    }catch(err){
        next(err);
    }
 
}

module.exports = { readToken };
