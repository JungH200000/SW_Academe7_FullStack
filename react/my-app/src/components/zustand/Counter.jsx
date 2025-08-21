// Counter.jsx
import React from 'react';
// import { useStore } from '../../stores/counterStore';
import { useCountStore } from '../../stores/counterStore2';

export default function Counter() {
    //useStore로  전역적인 state받아오기
    // const { count, increase, decrease } = useStore();
    const { count, increase, decrease } = useCountStore();
    return (
        <div className="text-center my-5 py-4">
            <h1>카운트 : {count}</h1>
            <hr />
            <button className="btn btn-success mx-1" onClick={increase}>
                +
            </button>
            <button className="btn btn-warning" onClick={decrease}>
                -
            </button>
        </div>
    );
}
