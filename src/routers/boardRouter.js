const express = require('express');
const boardController = require('../controllers/boardController');
const { readToken } = require('../middleware/readToken');
const boardRouter = express.Router();

boardRouter.get('/list', boardController.getBoard);
boardRouter.get('/post/:id', boardController.getPost);
boardRouter.post('/',readToken,boardController.writePost);
boardRouter.put('/:id',boardController.modifyPost);
boardRouter.delete('/:id',boardController.deletePost);

module.exports = boardRouter;