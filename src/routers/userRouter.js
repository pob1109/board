const express = require('express');
const userController = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post('/login', userController.loginUser);
userRouter.post('/signUp', userController.signUpUser);
userRouter.post('/readToken',userController.readToken);
//userRouter.put('/:email',userController.modifyPassword);
userRouter.delete('/',userController.deleteUser);

module.exports = userRouter;