const errGenerator = require('../middleware/errGenerator');
const bcrypt = require('bcryptjs');

class Service{

    async isSamePassword(password,password2){
        if(password !== password2){
            throw errGenerator('비밀번호가 서로 다릅니다.',400);
        }
    }

    async hashingPassword(password){
        return bcrypt.hashSync(password,bcrypt.genSaltSync(10));
    }

}

const service = new Service;
module.exports = service;