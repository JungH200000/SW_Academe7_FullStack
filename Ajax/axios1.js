// axios1.js
function init() {
    const b1 = document.getElementById('b1');
    const b2 = document.getElementById('b2');
    const b3 = document.getElementById('b3');

    const result = document.getElementById('result');

    b1.addEventListener('click', () => {
        const url = 'User.json';
        //get(url,options)
        axios
            .get(url)
            .then((res) => {
                //alert(JSON.stringify(res));
                const user = res.data.data;

                let str = `<ul class="list-group">
                    <li class="list-group-item">Name:${user.first_name} ${user.last_name} </li>
                    <li class="list-group-item">Email: ${user.email}</li>
                </ul>
                `;
                result.innerHTML = str;
            })
            .catch((err) => alert('error: ' + err));
    });

    //alert(b1);
    //b2 클릭시 News.json 데이터 가져와 result에 출력하세요
    b2.addEventListener('click', () => {
        const url = 'News.json';
        axios
            .get(url)
            .then((res) => {
                const news = res.data.items;
                //alert(JSON.stringify(news));
                showNews(news);
            })
            .catch((err) => alert('error: ' + err));
    }); //------------------------

    b3.onclick = async () => {
        const url = 'https://www.hankyung.com/feed/economy';
        //한경닷컴 서버로 직접 요청을 보내보자. ==> 에러 발생 (sop 정책때문)
        //same orign policy (동일 출처 정책) : 같은 서버 내에서만 통신 가능
        //cors 정책 (cross origin resource sharing)에 의해 차단됨
        try {
            const res = await axios.get(url); //xml형태로 응답
            alert(res);
            //showNews(res);
        } catch (error) {
            alert(error);
        }
    }; //--------------------

    b4.onclick = async () => {
        const url = 'https://www.hankyung.com/feed/economy'; //[x]
        //대리서버(proxy server-rss2json)를 통해 요청을 보내보자
        const proxy_url =
            'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.hankyung.com%2Ffeed%2Feconomy&api_key=여기에 api key';

        try {
            const res = await axios.get(proxy_url, {
                params: { count: 20 },
            });
            showNews(res.data.items);
        } catch (error) {
            alert('error: ' + error);
        }
    };
} //init--------------------

function showNews(news) {
    const today = new Date();
    let str = `
    <h2>오늘의 뉴스 - ${today.toLocaleString()}</h2>
    <div class="list-group">`;
    for (item of news) {
        const { title, pubDate, author, link } = item;
        str += `
            <a   class="list-group-item" href="${link}" target="_blank">${title} [${author}]  </a>        
        `;
    }
    str += `</div>`;

    result.innerHTML = str;
} //----------------------------

document.addEventListener('DOMContentLoaded', init);
