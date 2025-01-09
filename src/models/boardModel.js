const boardQuery = require('../db/boardQuery')

class BoardModel{

    async getBoard(){
        return boardQuery.getBoard();
    }

    async getPagingBoard(page,pageSize,searchKeyword,email){
        const start = (page - 1) * pageSize;
        const boardData = await boardQuery.getPagingBoard(start,pageSize,searchKeyword,email);
        const totalPageData = await boardQuery.countTotalPost(searchKeyword,email);
        const totalPage = Math.ceil(totalPageData[0]['COUNT(*)']/pageSize);
        return {boardData,totalPage};
    }

    async getPostById(id){
        return boardQuery.getPostById(id);
    }

    async addNewPost(title,content,email){
        return boardQuery.addNewPost(title,content,email);
    }

    async updatePost(id,title,content){
        return boardQuery.updatePost(id,title,content);
    }
    async deletePostById(id){
        return boardQuery.deletePostById(id);
    }
}

const boardModel = new BoardModel;
module.exports = boardModel;