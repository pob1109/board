const express = require('express');
const boardController = require('../controllers/boardController');
const { readToken } = require('../middleware/readToken');
const {isSameUser} = require('../middleware/isSameUser');
const boardRouter = express.Router();

boardRouter.get('/list', boardController.getBoard);
boardRouter.get('/post/:id', boardController.getPost);
boardRouter.post('/',readToken,boardController.writePost);
boardRouter.put('/:id',readToken,isSameUser,boardController.modifyPost);
boardRouter.delete('/:id',readToken,isSameUser,boardController.deletePost);

module.exports = boardRouter;