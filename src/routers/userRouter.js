const express = require('express');
const userController = require('../controllers/userController');
const { readToken } = require('../middleware/readToken');
const userRouter = express.Router();

userRouter.get('/finduser/:email',userController.findUser);
userRouter.get('/sendEmail/:email',userController.sendEmail);
userRouter.post('/login', userController.loginUser);
userRouter.post('/signUp', userController.signUpUser);
userRouter.post('/tokenToEmail',readToken,userController.tokenToEmail);
userRouter.post('/checkCode',userController.checkCode);
//userRouter.put('/:email',userController.modifyPassword);
userRouter.delete('/',userController.deleteUser);

module.exports = userRouter;