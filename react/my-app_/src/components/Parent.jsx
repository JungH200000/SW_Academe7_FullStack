// Parent.jsx
//부모 컴포넌트: Parent
//자식 컴포넌트: Child
//부모 ===> 자식 : props로 전달
//자식 ===> 부모 : 이벤트 통해서 전달
import { useState } from 'react';

export default function Parent() {
    const [color, setColor] = useState('darkcyan');

    const handleChangeColor = (newColor) => {
        //state 값 변경
        console.log('newColor: ', newColor);
        setColor(newColor);
    };

    return (
        <div style={{ padding: '1.5em' }}>
            <h2>부모 - Parent 컴포넌트</h2>
            <p style={{ color: color, fontSize: '2em' }}>
                현재 색상 : <span>{color}</span>
                <br></br>
                <button
                    onClick={() => {
                        handleChangeColor('purple');
                    }}
                >
                    색상변경(purple)
                </button>
            </p>
            {/* 자식 */}
            <hr></hr>
            <Child parentColor={color} onChangeColor={handleChangeColor} />
            {/* 부모=>자식 props를 이용해 전달 */}
        </div>
    );
}

function Child({ parentColor, onChangeColor }) {
    const mystyle = {
        border: '1px solid gray',
        padding: '1em',
        marginTop: '1em',
    };
    return (
        <div style={mystyle}>
            <h3>자식 - Child 컴포넌트</h3>
            <hr></hr>
            <p>
                부모로부터 받은 색상:{' '}
                <strong style={{ color: parentColor, fontSize: '2em' }}>색상 : {parentColor}</strong>
            </p>
            <hr></hr>
            <button
                onClick={() => {
                    // parentColor = 'red'; //[x] props는 수정 불가 (readonly)
                    onChangeColor('red');
                }}
            >
                Red
            </button>
            <button onClick={() => onChangeColor('green')}>Green</button>
            <button onClick={() => onChangeColor('blue')}>Blue</button>
        </div>
    );
}
