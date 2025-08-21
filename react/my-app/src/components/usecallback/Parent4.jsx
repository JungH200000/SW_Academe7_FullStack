//Parent1.jsx
//[3] 함수를 Child에 props로 전달해보자 => useCallback없이 함수 전달
import { useState, memo, useCallback } from 'react';

export default function Parent1() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');
    console.log('Parent1 렌더링...');
    //const callFn= useCallback(함수,[의존성배열])

    const handleClick = useCallback(() => {
        setCount((prev) => prev + 1);
    }, []);

    return (
        <div>
            <h2>Parent1 컴포넌트- memo와 useCallback을 사용하여 성능 최적화 </h2>
            <p>
                Child는 memo로 감싸있었도, handleClick이 매 렌더링될 때 마다 새로운 함수로 생성된다 - 이 함수를 props로
                Child에 전달하면 - Child는 다시 렌더링 - 이를 해결하기 위해 useCallback훅을 사용해야 한다
            </p>
            <p>
                memo만으로는 함수 props가 전달시 재렌더링을 막을 수 없다. <br></br>
                useCallback을 함께 사용해야 memo가 제대로 동작함
            </p>
            <Child value={count} onClick={handleClick} />
            <button className="btn btn-info" onClick={handleClick}>
                증가
            </button>
            <br></br>
            <input onChange={(e) => setText(e.target.value)} />
            <br></br>
            text: {text}
        </div>
    );
}
//const 고차컴포넌트 = memo(컴포넌트)
//memo 는 props가 변경되면 => 재렌더링을 함
//        props가 변경되지 않으면 렌더링을 방지한다
//count를 증가시키면 =>Child의 props변경 ==> 재렌더링
//text를 변경하면 => Child 렌더링되지 않음
const Child = memo(function Child({ value, onClick }) {
    console.log('Child 렌더링...');

    return (
        <div style={{ border: 'thick dotted darkcyan' }}>
            <h3>Child 컴포넌트</h3>
            <h3 className="text-primary">부모로 부터 받은 값: {value}</h3>
            <button className="btn btn-success" onClick={onClick}>
                {value}
            </button>
        </div>
    );
});
