//Parent1.jsx
//부모가 리렌더링되면 자식도 렌더링되는 것 확인하는 예제
import { useState } from 'react';

export default function Parent1() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');
    console.log('Parent1 렌더링...');

    const handleClick = () => {
        setCount((prev) => prev + 1);
    };

    return (
        <div>
            <h2>Parent1 컴포넌트</h2>
            <Child value={count} />
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

function Child({ value }) {
    console.log('Child 렌더링...');

    return (
        <div style={{ border: 'thick dotted purple' }}>
            <h3>Child 컴포넌트</h3>
            <h3 className="text-primary">부모로 부터 받은 값: {value}</h3>
        </div>
    );
}
