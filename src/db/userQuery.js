const db = require('./db');

const executeQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

module.exports = {
    findUserByEmail: (email) => executeQuery('SELECT * FROM user WHERE email = ?', [email]),
    signUpUser: (email,password) => executeQuery('INSERT INTO user (email, password) VALUES (?, ?)',[email, password]),
    //updatePost: (id,title,content) => executeQuery('UPDATE board SET title = ?, content = ? WHERE id = ?', [title,content,id]),
    deleteUserByEmail: (email) => executeQuery('DELETE FROM user WHERE email = ?',[email]),
};
