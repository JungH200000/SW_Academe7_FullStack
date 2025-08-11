// JSXEx01.jsx
export default function JsxEx01() {
    //Pascal 표기법 사용. (대문자로 시작. )
    const message = '오늘도 즐거운 하루 되세요~';
    const mycss = {
        // 배경색, 패딩, 보더, 마진탑
        backgroundColor: 'lightblue',
        color: 'navy',
        padding: '1em',
        marginTop: '1em',
    };

    return (
        <div className="container py-5">
            <h1>JSX의 기본 문법 - xml규칙을 따름</h1>
            <h2>시작태그와 종료태그가 쌍으로 있어야 한다</h2>
            <img src="images/1.jpg" style={{ width: '200px', border: 'thick dashed red' }}></img>
            {/* jsx주석(복문주석). img태그에는 반드시 src, alt속성 값을 주자 */}
            {
                // 단문주석
            }
            <h2 style={{ backgroundColor: 'lightgreen', marginTop: '1em', color: 'darkcyan' }}>{message}</h2>
            {/* 배경색, margin top부분 1em 글자색 */}
            <h2 style={mycss}>The End JsxEx01</h2>
        </div>
    );
}
