const userModel = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const service = require('../services/service');

const userController = {
    loginUser: asyncHandler(async(req, res, next) => {
        const {email, password} = req.body;
        const jwtToken = await userModel.loginUser(email,password);
        res.status(200).setHeader("Authorization","Bearer "+jwtToken).send('success');
    }),

    signUpUser : asyncHandler(async(req, res, next) => {
        const {email, password,password2} = req.body;
        await service.isSamePassword(password,password2);
        const hashingPassword = await service.hashingPassword(password);
        await userModel.signUpUser(email,hashingPassword);
        res.status(201).send('success');
    }),

    tokenToEmail : asyncHandler(async(req, res, next) => {
        const email = req.user;
        res.status(200).json(email);
    }),

    /*modifyPassword : asyncHandler(async(req,res,next)=>{
        const email = req.params.email;
        await boardService.deleteUserByEmail(email);
        res.status(200).send('success');
    }),
*/
    deleteUser : asyncHandler(async(req, res, next) => {
        const token = req.headers.Authorization;
        await boardModel.deleteUserByEmail(token);
        res.status(200).send('success');
    })
}

module.exports = userController;

