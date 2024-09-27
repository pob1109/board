const express = require('express');
const boardController = require('../controllers/boardController');
const boardRouter = express.Router();

boardRouter.get('/list', boardController.getBoard);
boardRouter.get('/post/:id', boardController.getPost);
boardRouter.post('/', boardController.writePost);
boardRouter.put('/:id',boardController.modifyPost);
boardRouter.delete('/:id',boardController.deletePost);

module.exports = boardRouter;