const dbQuery = require('../db/dbQuery')

class BoardService{

    async getBoard(){
        return dbQuery.getBoard();
    }

    async getPostById(id){
        return dbQuery.getPostById(id);
    }

    async addNewPost(title,content){
        return dbQuery.addNewPost(title,content);
    }

    async updatePost(id,title,content){
        return dbQuery.updatePost(id,title,content);
    }
    async deletePostById(id){
        return dbQuery.deletePostById(id);
    }
}

const boardService = new BoardService;
module.exports = boardService;