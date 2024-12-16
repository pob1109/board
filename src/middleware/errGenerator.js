const errGenerator = (msg, statusCode) => {
    let err = new Error(msg);
    err.status = statusCode;
    return err;
};

module.exports = errGenerator;