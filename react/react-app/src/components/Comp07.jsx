import { useState } from 'react';

export default function Profile() {
    // state : name, age, email

    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState('');

    const onChangeNameHandler = (evt) => {
        // console.log('evt.target: ', evt.target); //input
        // console.log('evt.target.value: ', evt.target.value);
        setName(evt.target.value);
    };
    /*
    [1] 상태값(state)과 입력값을 일치시키기 위해 input value에 state값을 할당
    [2] input의 이벤트:  onChange
    [3] event.target : 이벤트가 발생된 폼 컨트롤
        event.target.value : 사용자가 입력한 값
    */
    //    age 이벤트 핸들러 함수: onChangeAgeHandler

    const onChangeAgeHandler = (evt) => {
        setAge(parseInt(evt.target.value)); //evt.target.value=>string타입
    };

    return (
        <div className="container py-5">
            <input
                type="text"
                name="name"
                onChange={onChangeNameHandler}
                value={name}
                placeholder="Name"
                className="form-control"
            />
            <br />
            <br />

            <input
                type="number"
                name="age"
                value={age}
                onChange={onChangeAgeHandler}
                placeholder="Age"
                className="form-control"
            />
            <br />
            <br />

            <input
                type="email"
                name="email"
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                value={email}
                placeholder="Email"
                className="form-control"
            />
            <br />
            <br />
            <hr></hr>
            <div className="alert alert-primary">
                <h2>이름: {name} </h2>
                <h2>나이: {age} </h2>
                <h2>이메일: {email} </h2>
            </div>
        </div>
    );
}
