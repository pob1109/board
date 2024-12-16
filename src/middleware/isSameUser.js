const errGenerator = require('../middleware/errGenerator');
const boardModel = require('../models/boardModel');

async function isSameUser(req,res,next) {
    try{
        const tokenEmail = req.user;
        const postId = req.params.id;
        const postData = await boardModel.getPostById(postId);

        if (!tokenEmail) {
            throw errGenerator('로그인 상태가 아닙니다',401);
        }
        
        if(!postId || !postData[0]){
            throw errGenerator('존재하지 않는 게시물입니다.',400);
        }
        
        if(tokenEmail != postData[0].email){
            throw errGenerator('같은 유저가 아닙니다.',401);
        }
        next();

    }catch(err){
        next(err);
    }
 
}

module.exports = { isSameUser };
