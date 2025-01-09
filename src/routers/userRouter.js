const express = require('express');
const userController = require('../controllers/userController');
const { readToken } = require('../middleware/readToken');
const userRouter = express.Router();

userRouter.get('/findUser/:email',userController.findUser);
userRouter.get('/sendEmail/:email',userController.sendEmail);
userRouter.get('/tokenToEmail',readToken,userController.tokenToEmail);
userRouter.post('/login', userController.loginUser);
userRouter.post('/signUp', userController.signUpUser);
userRouter.post('/checkCode',userController.checkCode);
//userRouter.put('/:email',userController.modifyPassword);
userRouter.delete('/',readToken,userController.deleteUser);

module.exports = userRouter;