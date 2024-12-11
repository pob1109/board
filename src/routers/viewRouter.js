const express = require('express');
const path = require('path');
const viewRouter = express.Router();

viewRouter.use(express.static(path.resolve(__dirname, '../public')));

viewRouter.get('/list',(req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/boardlist.html'));
});

viewRouter.get('/view/:id',(req, res) => {
    res.sendFile(path.resolve(__dirname,'../views/boardview.html'));
});

viewRouter.get('/write',(req, res) => {
    res.sendFile(path.resolve(__dirname,'../views/boardwrite.html'));
});

viewRouter.get('/modify/:id',(req, res) => {
    res.sendFile(path.resolve(__dirname,'../views/boardmodify.html'));
});

viewRouter.get('/login',(req, res) => {
    res.sendFile(path.resolve(__dirname,'../views/login.html'));
});

viewRouter.get('/signUp',(req, res) => {
    res.sendFile(path.resolve(__dirname,'../views/signUp.html'));
});

viewRouter.get('/header',(req, res) => {
    res.sendFile(path.resolve(__dirname,'../views/header.html'));
});

module.exports = viewRouter;