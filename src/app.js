const express = require('express');
const app = express();
const boardRouter = require('./routers/boardRouter');
const viewRouter = require('./routers/viewRouter');

app.use(express.json());

app.use('/',viewRouter);
app.use('/api/board',boardRouter);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500)
        .send(err.message)
        .json(err.res || {});
});

module.exports = app;