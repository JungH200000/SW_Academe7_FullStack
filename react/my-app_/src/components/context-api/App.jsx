// App.jsx
//props drilling
import { useState } from 'react';

export default function App() {
    const [nickName, setNickName] = useState('홍길동');

    return (
        <div className="container py-4 text-center">
            <div>
                <h1>상위 부모 App - 상단 메뉴</h1>
            </div>
            <div>
                {/* 프로필 컴포넌트 - 컨텐츠 */}
                <Profile userId={nickName} />
            </div>
            <div>
                <h3>하단 메뉴</h3>
            </div>
        </div>
    );
}
function Profile({ userId }) {
    return (
        <div className="alert alert-primary">
            <h2>My Profile</h2>
            {/* Greeting 컴포넌트 */}
            <Greeting userId={userId} />
        </div>
    );
}

function Greeting({ userId }) {
    return (
        <p style={{ border: 'thick dashed orange' }}>
            <h4 className="text-primary">{userId} 님 로그인 중</h4>
            <p>저는 프런트엔드 개발자 입니다</p>
        </p>
    );
}
