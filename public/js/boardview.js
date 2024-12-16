const postId = window.location.pathname.split('/').pop();
const token = sessionStorage.getItem("authToken");
if (!token){
        window.location.href = '/login'
        throw new Error('로그인 후에 사용할 수 있는 기능입니다.');
}

// 게시물 데이터 및 사용자 권한 확인
async function fetchPostData() {
    try {
        const postData = await fetch(`/api/board/post/${postId}`).then(res => res.json());
        document.getElementById('boardTitle').innerText = postData.title;
        document.getElementById('boardEmail').innerText = postData.email;
        document.getElementById('boardContent').textContent = postData.content;
    } catch (error) {
        console.error('오류 발생:', error);
        alert('게시물 정보를 가져오는 데 실패했습니다.');
    }
}

async function checkUser(boardEmail) {
    try {
        const tokenEmail = await fetch(`/api/user/tokenToEmail`, {
            method: 'POST',
            headers: { 'authorization': token },
        }).then(res => res.json());

        if (tokenEmail !== boardEmail) {
            throw new Error('작성자와 같은 유저가 아닙니다.');
        }
        return true;
    } catch (error) {
        console.error('사용자 확인 중 오류 발생:', error);
        alert(error);
        return false;
    }
}

// 삭제 버튼 기능
document.getElementById('deleteBtn').addEventListener('click', async function () {
    try {
        const boardEmail = document.getElementById('boardEmail').innerText;
        if (await checkUser(boardEmail)) {
            if (confirm("정말 삭제하시겠습니까?")) {
                const res = await fetch(`/api/board/${postId}`, { 
                    method: 'DELETE' ,
                    headers: {'authorization': token},
                });

                if (res.status === 200) {
                    alert('삭제되었습니다.');
                    window.location.href = '/list';
                } else {
                    throw new Error('Failed to delete post');
                }
            }
        }
    } catch (error) {
        console.error('삭제 중 오류 발생:', error);
        alert('게시물 삭제에 실패했습니다.');
    }
});

//수정버튼 기능
document.getElementById('modifyBtn').addEventListener('click', function(){
        window.location.href =`/modify/${postId}`
})

fetchPostData();