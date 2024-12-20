const errGenerator = require('../middleware/errGenerator');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const authCode = new Map();

class Service{
    async randomCode(){
        const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
        let result = '';
        for (let i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    async sendEmail(email,code){
        // 보내는 메일 설정
        const transporter = nodemailer.createTransport({
            service: 'gmail',   // gmail로 메일을 보낼 것이기 때문에 gmail로 설정
            port: 587,
            host: 'smtp.gmail.com',
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.NODEMAILER_USER,  // 보내는 메일의 주소
                pass: process.env.NODEMAILER_PASS   // 보내는 메일의 2차 비밀번호
            }
        });
        
        // 메일 옵션 설정
        const mailOptions = {
            from: `인증번호 <${process.env.NODEMAILER_USER}>`, 
            to: email, 
            subject: "해당 인증번호를 입력해주세요.", 
            html: `<h3>이메일 인증</h3>
            <div>
                인증번호 [${code}]를 인증 창에 입력하세요.
            </div>`,
        };

        const expiresAt = Date.now() + 5 * 60 * 1000;

        try{
            //인증번호 서버에 5분동안 저장
            await authCode.set(email,{code,expiresAt});

            // 메일 발송    
            await transporter.sendMail(mailOptions);
        }catch(err){
            throw errGenerator(err,500);
        }            

    }

    async checkCode(email,code){
        try{
            const data = await authCode.get(email);

            if(!data){
                throw errGenerator('인증번호가 존재하지 않습니다.',400);
            }

            if(Date.now() > data.expiresAt){
                authCode.delete(email);
                throw errGenerator('인증번호가 만료되었습니다.',400);
            }

            if(code != data.code){
                throw errGenerator('인증번호가 일치하지 않습니다.',400);
            }

        }catch(err){
            throw errGenerator(err,500)
        }
    }

    async hashingPassword(password){
        return bcrypt.hashSync(password,bcrypt.genSaltSync(10));
    }

}

const service = new Service;
module.exports = service;