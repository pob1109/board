// 현재 게시물 ID를 URL에서 추출
const postId = window.location.pathname.split('/').pop();

// 로그인 체크
const token = sessionStorage.getItem("authToken");
if (!token) {
    window.location.href = '/login';
    alert("로그인 후에 사용할 수 있는 기능입니다.");
}
else{
    fetchPostData(token);    
}


// 게시물 데이터 및 사용자 권한 확인
async function fetchPostData(token) {
    try {
        const [postData, tokenEmail] = await Promise.all([
            fetch(`/api/board/post/${postId}`).then(res => res.json()),
            fetch(`/api/user/tokenToEmail`, {
                method: 'POST',
                headers: { 'authorization': token },
            }).then(res => res.json())
        ]);

        if (tokenEmail !== postData.email) {
            window.location.href = `/view/${postId}`;
            alert('게시글 수정에 대한 권한이 없습니다.');   
        }

        document.getElementById('title').value = postData.title;
        document.getElementById('content').value = postData.content;

    } catch (error) {
        console.error('오류 발생:', error);
        alert('게시물 정보를 가져오는 데 실패했습니다.');
    }
}

// 폼 제출 이벤트 처리
document.getElementById('updateForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // 기본 제출 동작 방지

    const updatedTitle = document.getElementById('title').value;
    const updatedContent = document.getElementById('content').value;

    try {
        const res = await fetch(`/api/board/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token,
            },
            body: JSON.stringify({
                title: updatedTitle,
                content: updatedContent
            })
        });

        if (res.status === 200) {
            alert('게시물이 성공적으로 수정되었습니다.');
            window.location.href = '/list';
        } else {
            throw new Error('Failed to update post');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('게시물 수정에 실패했습니다.');
    }
});


