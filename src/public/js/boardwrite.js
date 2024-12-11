//로그인 체크
const token = sessionStorage.getItem("authToken");
if (!token){
    window.location.href = '/login';
    alert("로그인 후에 사용할 수 있는 기능입니다.");
}

document.getElementById('postForm').addEventListener('submit',function(event){
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    fetch('/api/board', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // JSON 형식으로 데이터 전송
            'authorization': token,
        },
        body: JSON.stringify({title,content}),
    })
    .then(res => {
        if(res.status === 201){
            alert("작성에 성공했습니다.");
            window.location.href = '/list';
        }else{
            alert("작성에 실패했습니다.");
        }                    
    })
    .catch(error => console.error(error));
})