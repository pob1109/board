//로그인 체크
const token = sessionStorage.getItem("authToken");
if (!token){
    window.location.href = '/login';
    alert("로그인 후에 사용할 수 있는 기능입니다.");
}

// 현재 게시물 ID를 URL에서 추출
const postId = window.location.pathname.split('/').pop(); // URL에서 postId 추출

async function fetchPostData(){
    try {
        // 게시물 데이터 가져오기
        const postData = await (await fetch(`/api/board/post/${postId}`)).json();
        
        // 사용자 이메일 확인 및 권한 검사
        const tokenEmail = await (await fetch(`/api/user/tokenToEmail`, {
            method: 'POST',
            headers: { 'authorization': token },
        })).json();

        if (tokenEmail !== postData.email) {
            window.history.back();
            alert('게시글 수정에 대한 권한이 없습니다.');
        }
        
        document.getElementById('title').value = postData.title;
        document.getElementById('content').value = postData.content;
    } catch (error) {
        console.error('오류 발생:', error);
    }
};

// 폼 제출 이벤트 처리
document.getElementById('updateForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 기본 제출 동작 방지

    const updatedTitle = document.getElementById('title').value;
    const updatedContent = document.getElementById('content').value;

    // API 호출로 수정된 데이터를 전송
    fetch(`/api/board/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: updatedTitle,
            content: updatedContent
        })
    })
    .then(res => {
        if (res.status === 200) {
            alert('게시물이 성공적으로 수정되었습니다.');
            window.location.href = '/list'
        } else {
            alert('게시물 수정에 실패했습니다.');
        }
    })
    .catch(error => console.error('Error:', error))
});

fetchPostData();