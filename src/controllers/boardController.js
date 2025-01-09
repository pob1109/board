const boardModel = require('../models/boardModel');
const asyncHandler = require('express-async-handler');

const boardController = {
    getBoard : asyncHandler(async(req, res, next) => {
        const pageInfo = req.query;
        const page = parseInt(pageInfo.page);
        const pageSize = parseInt(pageInfo.pageSize);
        const searchKeyword = pageInfo.searchKeyword;

        const boardData = await boardModel.getPagingBoard(page,pageSize,searchKeyword);

        res.status(200).json(boardData);
    }),

    getMyPage : asyncHandler(async(req, res, next) => {
        const pageInfo = req.query;
        const page = parseInt(pageInfo.page);
        const pageSize = parseInt(pageInfo.pageSize);
        const searchKeyword = pageInfo.searchKeyword;
        const email = req.user;

        const boardData = await boardModel.getPagingBoard(page,pageSize,searchKeyword,email);

        res.status(200).json(boardData);
    }),

    getPost : asyncHandler(async(req, res, next) => {
        const postId = req.params.id;
        const boardData = await boardModel.getPostById(postId);
        res.status(200).json(boardData[0]);
    }),

    writePost : asyncHandler(async(req, res, next) => {
        const email = req.user;
        const {title,content} = req.body;
        await boardModel.addNewPost(title,content,email);
        res.status(201).send('success');
    }),

    modifyPost : asyncHandler(async(req,res,next)=>{
        const postId = req.params.id;
        const {title,content} = req.body;
        await boardModel.updatePost(postId,title,content);
        res.status(200).send('success');  
    }),

    deletePost : asyncHandler(async(req, res, next) => {
        const postId = req.params.id;
        await boardModel.deletePostById(postId);
        res.status(200).send('success');
    }),
}

module.exports = boardController;

