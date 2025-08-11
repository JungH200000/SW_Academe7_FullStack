// UseEffectHook.jsx
import { useState, useEffect } from 'react';

export default function UseEffectHook() {
    const [count, setCount] = useState(0);
    //componentDidMount()/componentDidUpdate()  와 비슷
    useEffect(() => {
        console.log('useEffect훅: component Mounted=> count: ', count);
        document.title = `click count: ${count} times`;

        return () => {
            //componentWillUnmount()와 비슷
            console.log('Clean Up : unmount될 때 해야할 작업을 여기에 기술');
        };
    }, []);
    //의존성 배열에 빈 배열을 전달하면 => 처음 렌더링한 후에만 useEffect훅이 실행된다

    return (
        <div>
            <div className="alert alert-danger">
                <h2>You clicked {count} times</h2>
            </div>
            <button
                className="btn btn-info"
                onClick={() => {
                    setCount((prev) => prev + 1);
                }}
            >
                Click Me
            </button>
        </div>
    );
}
