const dbQuery = require('../db/dbQuery')

class BoardService{

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