document.getElementById('signUpForm').addEventListener('submit',async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;

    try{
        const response = await fetch('api/user/signUp',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({email,password,password2}),
        });

        if (response.status==201){
            alert('회원가입에 성공했습니다. 로그인해주세요');
            window.location.href = '/login';
        }else{
            response.text().then(errMessage =>{
                alert(errMessage);
            });
        }
    }catch(error){
        console.error('회원가입 중 오류',error);
    }
})