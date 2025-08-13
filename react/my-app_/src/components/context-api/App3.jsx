// App2.jsx
//Context API를 사용해보자.
import { useState, createContext, useContext } from 'react';
/*
 *  createContext()를 호출하면 Context객체를 반환한다
    
    변수 = createContext('초기값')
 *  createContext()가 반환하는 값 ==>객체=>{ Provider, Consumer }
    Provider: 데이터 공급자 ==> App 컴포넌트
 *  Consumer: 데이터 소비자 ==> Greeting
 */

const UserContext = createContext('unknown');

export default function App() {
    const [nickName, setNickName] = useState('유재석');

    return (
        <div className="container py-4 text-center">
            <UserContext.Provider value={nickName}>
                {/* nickName을 공급하는 공급자 컴포넌트 */}
                <div>
                    <h1>상위 부모 App - 상단 메뉴(useContext훅)</h1>
                </div>
                <div>
                    {/* 프로필 컴포넌트 - 컨텐츠 */}
                    <Profile />
                </div>
                <div>
                    <h3>하단 메뉴</h3>
                </div>
            </UserContext.Provider>
        </div>
    );
}
function Profile() {
    return (
        <div className="alert alert-danger">
            <h2>My Profile</h2>
            {/* Greeting 컴포넌트 */}
            <Greeting />
        </div>
    );
}
//[3] useContext()훅을 이용해 Consumer없이 데이터를 받아 사용한다
function Greeting() {
    const nickName = useContext(UserContext);

    return (
        <p style={{ border: 'thick dashed magenta' }}>
            <h4 className="text-info"> {nickName} 님 로그인 중</h4>
            <p>저는 백엔드 개발자 입니다</p>
        </p>
    );
}
