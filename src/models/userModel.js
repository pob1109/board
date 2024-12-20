const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userQuery = require('../db/userQuery');
const dotenv = require('dotenv');
const errGenerator = require('../middleware/errGenerator');
dotenv.config();

class UserModel{
    async findUser(email){
        const user = await userQuery.findUserByEmail(email);
        if(!user[0]){
            return {email:undefined};
        }
        return user[0];
    }
    
    async signUpUser(email,password){
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

    //2. 비밀번호 바꾸는거(랜덤 비밀번호 만든다 -> 랜덤 비밀번호로 암호화한뒤에 바꿔(유저의 이메일이 필요) -> 이메일로 랜덤비밀번호를 전송 

    async deleteUserByEmail(token){
        await userQuery.deleteUserByEmail(token);
    }

}

const userModel = new UserModel;
module.exports = userModel;