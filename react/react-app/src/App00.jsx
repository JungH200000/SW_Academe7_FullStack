// App00.jsx
// 1. class 형 컴포넌트 작성하기
import React from 'react';

class MyComp extends React.Component {
    render() {
        return (
            <div className="container py-4">
                <h1 className="text-primary text-center">MyComp 컴포넌트</h1>
            </div>
        );
    }
}
export default MyComp;
