const dbQuery = require('../db/dbQuery')

class BoardModel{

    async getBoard(){
        return dbQuery.getBoard();
    }

    async getPagingBoard(page,pageSize,searchKeyword){
        const start = (page - 1) * pageSize;
        const boardData = await dbQuery.getPagingBoard(start,pageSize,searchKeyword);
        const totalPageData = await dbQuery.countTotalPost(searchKeyword);
        const totalPage = Math.ceil(totalPageData[0]['COUNT(*)']/pageSize);
        return {boardData,totalPage};
    }

    async getPostById(id){
        return dbQuery.getPostById(id);
    }

    async addNewPost(title,content,email){
        return dbQuery.addNewPost(title,content,email);
    }

    async updatePost(id,title,content){
        return dbQuery.updatePost(id,title,content);
    }
    async deletePostById(id){
        return dbQuery.deletePostById(id);
    }
}

const boardModel = new BoardModel;
module.exports = boardModel;