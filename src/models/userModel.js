const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userQuery = require('../db/userQuery');
const dotenv = require('dotenv');
const errGenerator = require('../middleware/errGenerator');
dotenv.config();

class UserModel{
    
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

    async deleteUserByEmail(token){
        await userQuery.deleteUserByEmail(token);
    }

}

const userModel = new UserModel;
module.exports = userModel;