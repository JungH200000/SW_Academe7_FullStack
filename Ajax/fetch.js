const bt1 = document.querySelector('#bt1');
const bt2 = document.querySelector('#bt2');
const bt3 = document.querySelector('#bt3');

const result = document.querySelector('#result');
const baseUrl = `https://reqres.in`;

bt1.onclick = function () {
    const id = prompt('조회할 회원의 번호 입력하세요', 1);
    if (!id) return;
    const url = baseUrl + `/api/users/${id}`;
    console.log(url);
    ////x-api-key: reqres-free-v1
    fetch(url, {
        method: 'GET',
        headers: {
            'x-api-key': 'reqres-free-v1',
        },
    })
        .then((response) => {
            //alert(response.ok); //200 OK 응답이 올경우 true 값을 갖는다
            if (!response.ok) throw new Error('데이터가 없거나 네트워크 에러');
            return response.json(); //JSON.parse(response) 한 효과
        })
        .then((obj) => {
            //alert(obj);
            renderUI(obj);
        })
        .catch((err) => {
            alert('error: ' + err);
        });
}; //--------------------

//bt2이벤트 처리해서 모든 회원정보 테이블 형태로 출력하세요
bt2.onclick = function () {
    const url = baseUrl + '/api/users?page=1&per_page=12';
    fetch(url, {
        method: 'get',
        headers: {
            'x-api-key': 'reqres-free-v1',
        },
        //body: JSON.stringify(data) <=post방식일 때
    })
        .then((res) => res.json())
        .then((obj) => renderArrayUI(obj))
        .catch((err) => alert('error: ' + err));
}; //-----------------------

bt3.onclick = function () {
    getAllUser(1, 3);
}; //----------------------------

//async/await
const getAllUser = async (page, perPage) => {
    event.preventDefault();

    //page: 페이지 번호
    //perPage: 한 페이지 당 보여줄 목록 개수
    const url = baseUrl + `/api/users?page=${page}&per_page=${perPage}`;
    console.log(url);
    try {
        const res = await fetch(url, {
            method: 'get',
            headers: {
                'x-api-key': 'reqres-free-v1',
            },
            //body: JSON.stringify(data) <=post방식일 때
        }); //await은 async 가 붙은 비동기 함수에서만 사용 가능
        //alert(res);
        const obj = await res.json();
        renderArrayUI(obj);
    } catch (err) {
        alert('데이터 가져오기 실패 ' + err);
    }
}; //---------------------------

//여러 데이터(배열) 렌더링하는 함수
const renderArrayUI = (obj) => {
    //alert(JSON.stringify(obj));
    const { page, total_pages, total } = obj;
    //page: 현재 보고 있는 페이지번호
    //total_pages: 총 페이지수
    //total : 총 회원 수
    if (!obj.data || obj.data.length == 0) {
        result.innerHTML = `<div class="alert alert-danger"><h3>데이터가 없어요</h3></div>`;
        return;
    }
    let str = `<table class="table">
                <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>`;
    obj.data.forEach((user, i) => {
        str += `<tr id="user${i}">
            <td>${user.id}</td>
            <td><img src="${user.avatar}"></td>
            <td>${user.first_name} ${user.last_name}</td>
            <td>${user.email}</td>
        </tr>
        `;
    });
    str += `</table>`;

    //페이지 네비게이션 문자열 만들기
    str += `<ul class="pagination justify-content-center">`;
    for (let i = 1; i <= total_pages; i++) {
        let mycss = i == page ? 'active' : '';

        str += `<li class="page-item ${mycss}"><a class="page-link" href="#" onclick="getAllUser(${i}, 3)">${i}</a></li>`;
    }
    str += `</ul>`;

    result.innerHTML = str;
};

const renderUI = (obj) => {
    // alert(JSON.stringify(obj));
    const { id, email, first_name, last_name, avatar } = obj.data;
    let str = `<table class="table">
    <tr>
        <th>ID</th>
        <th>Image</th>
        <th>Name</th>
        <th>Email</th>
    </tr>
    <tr>
        <td>${id}</td>
        <td>
            <img src="${avatar}">
        </td>
        <td>${first_name} ${last_name}</td>
        <td>${email}</td>
    </tr>
    `;

    str += `</table>`;
    result.innerHTML = str;
};
