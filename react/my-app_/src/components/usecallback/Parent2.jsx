//Parent1.jsx
//[2] memo를 이용해서 props가 변경되지 않으면 Child가 재랜더링되지 않음을 확인
import { useState, memo } from 'react';

export default function Parent1() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');
    console.log('Parent1 렌더링...');

    const handleClick = () => {
        setCount((prev) => prev + 1);
    };

    return (
        <div>
            <h2>Parent1 컴포넌트- memo를 사용하여 성능 최적화 </h2>
            <p>
                Reac.memo : 컴포넌트를 감싸서 props가 변경되지 않으면 재렌더링 되는 것을 방지하는 기능을 가진
                고차검포넌트(HOC)
            </p>
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
//const 고차컴포넌트 = memo(컴포넌트)
//memo 는 props가 변경되면 => 재렌더링을 함
//        props가 변경되지 않으면 렌더링을 방지한다
//count를 증가시키면 =>Child의 props변경 ==> 재렌더링
//text를 변경하면 => Child 렌더링되지 않음
const Child = memo(function Child({ value }) {
    console.log('Child 렌더링...');

    return (
        <div style={{ border: 'thick dotted hotpink' }}>
            <h3>Child 컴포넌트</h3>
            <h3 className="text-primary">부모로 부터 받은 값: {value}</h3>
        </div>
    );
});
