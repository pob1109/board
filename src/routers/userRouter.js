const express = require('express');
const userController = require('../controllers/userController');
const { readToken } = require('../middleware/readToken');
const userRouter = express.Router();

userRouter.post('/login', userController.loginUser);
userRouter.post('/signUp', userController.signUpUser);
userRouter.post('/tokenToEmail',readToken,userController.tokenToEmail);
//userRouter.put('/:email',userController.modifyPassword);
userRouter.delete('/',userController.deleteUser);

module.exports = userRouter;