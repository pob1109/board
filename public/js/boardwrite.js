// 로그인 체크
const token = sessionStorage.getItem("authToken");
if (!token) {
    alert("로그인 후에 사용할 수 있는 기능입니다.");
    window.location.href = '/login';
}

// 게시글 작성 처리
document.getElementById('postForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    try {
        const res = await fetch('/api/board', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token,
            },
            body: JSON.stringify({ title, content }),
        });

        if (res.status === 201) {
            window.location.href = '/list';
            alert("작성에 성공했습니다.")
        }else{
            alert("작성에 실패했습니다.");
        }
    } catch (error) {
        console.error(error);
    }
});