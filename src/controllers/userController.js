const userService = require('../services/userService');
const asyncHandler = require('express-async-handler');

const userController = {
    loginUser: asyncHandler(async(req, res, next) => {
        const {email, password} = req.body;
        const jwtToken = await userService.loginUser(email,password);
        res.status(200).setHeader("Authorization","Bearer "+jwtToken).send('success');
    }),

    signUpUser : asyncHandler(async(req, res, next) => {
        const {email, password,password2} = req.body;
        await userService.isSamePassword(password,password2);
        const hashingPassword = await userService.hashingPassword(password);
        await userService.signUpUser(email,hashingPassword);
        res.status(201).send('success');
    }),

    /*modifyPassword : asyncHandler(async(req,res,next)=>{
        const email = req.params.email;
        await boardService.deleteUserByEmail(email);
        res.status(200).send('success');
    }),
*/
    deleteUser : asyncHandler(async(req, res, next) => {
        const token = req.headers.Authorization;
        await boardService.deleteUserByEmail(token);
        res.status(200).send('success');
    })
}

module.exports = userController;

