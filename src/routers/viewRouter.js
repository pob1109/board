const express = require('express');
const viewRouter = express.Router();
const path = require('path');

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

viewRouter.get('/header.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/header.html'));
  });

module.exports = viewRouter;