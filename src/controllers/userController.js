const userModel = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const service = require('../services/service');

const userController = {
    loginUser: asyncHandler(async(req, res, next) => {
        const {email, password} = req.body;
        const jwtToken = await userModel.loginUser(email,password);
        res.status(200).setHeader("Authorization","Bearer "+jwtToken).send('success');
    }),

    findUser : asyncHandler(async(req, res, next) => {
        const email = req.params.email;
        const user = await userModel.findUser(email);
        res.status(200).json(user);
    }),

    signUpUser : asyncHandler(async(req, res, next) => {
        const {email, password} = req.body;
        const hashingPassword = await service.hashingPassword(password);
        await userModel.signUpUser(email,hashingPassword);
        res.status(201).send('success');
    }),

    tokenToEmail : asyncHandler(async(req, res, next) => {
        const email = req.user;
        res.status(200).json(email);
    }),

    sendEmail : asyncHandler(async(req,res,next) =>{
        const email = req.params.email;
        const code = await service.randomCode();
        await service.sendEmail(email,code);
        res.status(201).send('이메일을 전송했습니다.')
    }),

    checkCode : asyncHandler(async(req,res,next) =>{
        const {email,code}=req.body;
        await service.checkCode(email,code);
        res.status(200).send('인증에 성공하였습니다.'); 
    }),

    /*modifyPassword : asyncHandler(async(req,res,next)=>{
        const email = req.params.email;
        await boardService.deleteUserByEmail(email);
        res.status(200).send('success');
    }),
*/
    deleteUser : asyncHandler(async(req, res, next) => {
        const email=req.user;
        await userModel.deleteUserByEmail(email);
        res.status(200).send('success');
    })
}

module.exports = userController;

