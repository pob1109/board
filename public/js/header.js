async function loadHeader() {
    try {
        // header.html 삽입
        const response = await fetch('/header');
        document.getElementById('header').innerHTML = await response.text();

        // Header 삽입 후 updateHeader 호출
        await updateHeader();
    } catch (error) {
        console.error('Header loading failed:', error.message);
    }
}

async function updateHeader() {
    const token = sessionStorage.getItem("authToken");
    const authLinks = document.getElementById("auth-links");

    try {
        if (token) {
            const email = await getEmailFromToken(token);
            // 로그인 상태 UI
            authLinks.innerHTML = `
                <span>Welcome, ${email}!! </span>
                <button id="myPage">MyPage</button>
                <button id="logout-btn">Logout</button>
            `;
            // 로그아웃 이벤트 추가
            document.getElementById("logout-btn").addEventListener("click", logout);
            document.getElementById("myPage").addEventListener("click", ()=>{
                window.location.href = `/myPage`;
            });
        } else {
            // 비로그인 상태 UI
            authLinks.innerHTML = `
                <a href="/login">로그인</a>
                <a href="/signUp">회원가입</a>
            `;
        }
    } catch (error) {
        console.error('Failed to update header:', error.message);
    }
}

async function getEmailFromToken(token) {
    const response = await fetch(`/api/user/tokenToEmail`, {
        headers: { 'authorization': token },
    });
    
    if (response.status!=200)
        throw new Error('로그인에 문제가 발생했습니다.');

    return response.json();
}

function logout() {
    sessionStorage.removeItem("authToken");
    location.href = "/list";
}

// 실행
loadHeader();