let currentPage = 1;
let searchKeyword = "";

// 검색 기능
document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    searchKeyword = document.getElementById('searchKeyword').value.trim();
    renderPagination(1); // 검색 시 첫 페이지로 이동
});

// 글쓰기 버튼 기능
document.getElementById('writebtn').addEventListener('click', () => {
    window.location.href = '/write';
});

// 게시물 렌더링 함수
async function fetchBoardData(page, postLimit) {
    const response = await fetch(`/api/board/list?page=${page}&pageSize=${postLimit}&searchKeyword=${encodeURIComponent(searchKeyword)}`);
    return response.json();
}

// 게시글 목록 생성
function renderBoardList(boardData) {
    document.getElementById('boardList').innerHTML = boardData
        .map(board => `
            <tr>
                <td>${board.id}</td>
                <td><a href="/view/${board.id}">${board.title}</a></td>
                <td>${board.email}</td>
            </tr>
        `)
        .join('');
}

// 페이지네이션 버튼 생성
function renderPaginationButtons(page, totalPage) {
    const paginationEl = document.getElementById('pagination');
    const pagelimit = 5;
    const halfLimit = Math.floor(pagelimit / 2);

    let startPage = Math.max(1, page - halfLimit);
    let endPage = Math.min(totalPage, page + halfLimit);

    // 시작 페이지와 끝페이지에 가까울 경우
    if (startPage === 1) endPage = Math.min(totalPage, pagelimit);
    if (endPage === totalPage) startPage = Math.max(1, totalPage - pagelimit + 1);

    // 전체 페이지가 pagelimit보다 작을 경우
    if (totalPage <= pagelimit) {
        startPage = 1;
        endPage = totalPage;
    }

    // 버튼 HTML 생성
    paginationEl.innerHTML = `
        ${page > 1 ? createPaginationButton(page - 1, '<') : ''}
        ${Array.from({ length: endPage - startPage + 1 }, (_, i) => {
            const pageNum = startPage + i;
            return createPaginationButton(pageNum, pageNum, pageNum === page);
        }).join('')}
        ${page < totalPage ? createPaginationButton(page + 1, '>') : ''}
    `;
}

// 개별 페이지 버튼 생성
function createPaginationButton(page, text, isActive = false) {
    return `
        <a href="#" style="margin: 0 5px; text-decoration: none; ${isActive ? 'font-weight: bold; color: red;' : ''}" 
           onclick="renderPagination(${page})">${text}</a>
    `;
}

// 게시글과 페이지네이션 렌더링
async function renderPagination(page) {
    currentPage = page; // 현재 페이지 업데이트
    const postLimit = 12;

    try {
        const { boardData, totalPage } = await fetchBoardData(page, postLimit);
        renderBoardList(boardData); // 게시글 렌더링
        renderPaginationButtons(page, totalPage); // 페이지네이션 렌더링
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// 초기 로드
renderPagination(currentPage);