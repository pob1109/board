let emailVerified = false;
let codeVerified = false;

document.getElementById('checkEmail').addEventListener('click', async(event) => {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const email = emailInput.value;
    try{
        if(!email){
            throw new Error('이메일을 입력해주세요');
        }

        if(!emailInput.validity.valid){
            throw new Error('이메일 형식이 올바르지 않습니다.');
        }

        const userData = await fetch(`api/user/findUser/${email}`).then(res=>res.json());
        
        if(userData.email){
            emailVerified = false;
            throw new Error('이미 존재하는 이메일입니다.');
        }else{
            emailVerified = true;
            alert('사용 가능한 이메일입니다. 해당 이메일로 인증번호를 발송했습니다.');
            await fetch(`api/user/sendEmail/${email}`)
        }

    }catch(err){
        console.error(err);
        alert(err);
    }

});

document.getElementById('checkCode').addEventListener('click', async (event) => {
    event.preventDefault();

    const code = document.getElementById('code').value;
    const email = document.getElementById('email').value;

    try{
        if(!code){
            throw new Error('인증번호를 입력해주세요');
        }

        const res = await fetch('/api/user/checkCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, code}),
        });

        if(res.status == 200){
            codeVerified = true;
            alert('인증에 성공하였습니다.');
        }else{
            codeVerified = false;
            throw new Error(await res.text());
        }
    }catch(err){
        console.error(err);
        alert(err);
    }
});

document.getElementById('signUpForm').addEventListener('submit',async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;

    try{
        if(!emailVerified){
            throw new Error('먼저 중복확인을 해주세요.');
        }
        if(!codeVerified){
            throw new Error('먼저 인증번호 확인을 해주세요.');
        }

        if (password != password2){
            throw new Error('비밀번호가 서로 다릅니다.');
        }

        const response = await fetch('api/user/signUp',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({email,password}),
        });

        if (response.status==201){
            alert('회원가입에 성공했습니다. 로그인해주세요');
            window.location.href = '/login';
        }else{
            throw new Error('회원가입에 실패했습니다.');
        }
    }catch(error){
        console.error('회원가입 중 오류:',error);
        alert(error);
    }
})