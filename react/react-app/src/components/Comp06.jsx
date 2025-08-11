import { useState } from 'react';

const Counter = () => {
    // state 데이터
    const [count, setCount] = useState(0);

    // 일반 데이터
    let cnt = 100;

    const increment = () => {
        // alert('hi');
        // count 와 cnt를 1씩 증가
        //count++; [x] state는 setXXX()를 통해 수정해야 함
        // setCount(count + 1);
        setCount((prev) => prev + 1);
        cnt++;
        console.log('cnt: ', cnt);
    };
    const decrement = () => {
        // count 와 cnt를 1씩 감소
        // setCount(count - 1);
        setCount((value) => value - 1);
        cnt--;
        console.log('cnt: ', cnt);
    };

    return (
        <>
            <h2>카운터</h2>
            <div>
                현재 count : <span style={{ color: 'red', fontSize: '2em' }}>{count}</span>
            </div>

            <div>
                현재 cnt : <span style={{ color: 'blue', fontSize: '2em' }}>{cnt}</span>
            </div>
            <button className="btn btn-info" onClick={increment}>
                증가
            </button>
            <button className="btn btn-warning" onClick={decrement}>
                감소
            </button>
        </>
    );
};
export default Counter;
