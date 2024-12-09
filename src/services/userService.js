const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userQuery = require('../db/userQuery');
const dotenv = require('dotenv');
const errGenerator = require('../middleware/errGenerator');
dotenv.config();

class UserService{

    async hashingPassword(password){
        return bcrypt.hashSync(password,bcrypt.genSaltSync(10));
    }
    
    async signUpUser(email,password){
        const user = await userQuery.findUserByEmail(email);

        if(user){
            throw errGenerator('이미 존재하는 이메일입니다.',400);
        }

        return userQuery.signUpUser(email,password);
    }

    async loginUser(email,password){
            const user = await userQuery.findUserByEmail(email);
            
            if(!user[0]){
                throw errGenerator('이메일 혹은 비밀번호가 일치하지 않습니다.',401);
            }

            const isValidPassword = await bcrypt.compare(password,user[0].password);

            if(!isValidPassword){
                throw errGenerator('이메일 혹은 비밀번호가 일치하지 않습니다.',401);
            }

            const token = jwt.sign({email},process.env.KEY,{ expiresIn: '1d' });

            return token;
    }

    async isSamePassword(password,password2){
        if(password !== password2){
            throw errGenerator('비밀번호가 서로 다릅니다.',400);
        }
    }

    async readToken(authHeader){
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw errGenerator('로그인 상태가 아닙니다',401);
        }
        
        const token = authHeader.split(' ')[1];
        const verified = jwt.verify(token,process.env.KEY);
        return verified.email;
    }

   /* 
    async updatePost(id,title,content){
        return dbQuery.updatePost(id,title,content);
    }*/

    async deleteUserByEmail(token){
        console.log(token);
        await userQuery.deleteUserByEmail(token);
        return 
    }

}

const userService = new UserService;
module.exports = userService;