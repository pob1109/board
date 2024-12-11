document.getElementById('loginForm').addEventListener('submit',async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try{
        const response = await fetch('api/user/login',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({email,password}),
        });

        if (response.status==200){
            const token = response.headers.get('Authorization');
            sessionStorage.setItem('authToken',token);
            window.location.href = '/list';
        }else{
            response.text().then(errMessage =>{
                alert(errMessage);
            });
            
        }
    }catch(error){
        console.error('로그인 요청 중 오류',error);
    }
})