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
    getBoard: () => executeQuery('SELECT * FROM board'),
    getPagingBoard: (page,pageSize,searchKeyword,email) => executeQuery('SELECT * FROM board WHERE title LIKE ? AND (email = ? or ? is NULL) ORDER BY id DESC LIMIT ?,? '
                    ,['%'+searchKeyword+'%',email,email,page,pageSize,]),
    getPostById: (id) => executeQuery('SELECT * FROM board WHERE id = ?', [id]),
    addNewPost: (title,content,email) => executeQuery('INSERT INTO board (title, content,email) VALUES (?, ?, ?)',[title, content,email]),
    updatePost: (id,title,content) => executeQuery('UPDATE board SET title = ?, content = ? WHERE id = ?', [title,content,id]),
    deletePostById: (id) => executeQuery('DELETE FROM board WHERE id = ?',[id]),
    countTotalPost: (searchKeyword,email) => executeQuery('SELECT COUNT(*) FROM board WHERE title LIKE ? AND (email = ? or ? is NULL)',['%'+searchKeyword+'%',email,email]),
};
