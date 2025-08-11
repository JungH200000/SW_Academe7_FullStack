import { useState } from 'react';

export default function YourDemo({ mcolor, mbgcolor }) {
    //함수형에서는 state를 사용하려면 useState() 훅을 사용해야 함
    // const {mcolor,mbgcolor}=props;

    const [name, setName] = useState('홍길동'); //state명: name, setName()함수를 이용해서 변경. useState(초기값)
    //isLogin state 추가해보기
    const onButtonClick = () => {
        setName('최수지');
    };

    return (
        <div>
            <h2>함수형 컴포넌트 YourDemo에서 state사용</h2>
            <hr />
            <h1 style={{ color: mcolor, background: mbgcolor }}>{name}님 로그인 중</h1>

            <button className="btn btn-primary" onClick={onButtonClick}>
                이름 변경
            </button>
        </div>
    );
}
