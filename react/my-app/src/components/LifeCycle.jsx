// LifeCycle.jsx: 클래스형 컴포넌트 (생애주기 함수)
import { Component } from 'react';

export default class LifeCycle extends Component {
    state = { color: 'green' };

    constructor(props) {
        super(props);
        // this.state={color:"green"}
        console.log('LifeCycle 생성자 호출됨');
    }
    //constructor -> render -->componentDidMount
    componentDidMount() {
        console.log('componentDidMount() 호출됨');
    }

    //컴포넌트가 언마운트(숨김/라우팅 변경/조건부 렌더링/부모 변경)되기 직전에 호출된다
    componentWillUnmount() {
        console.log('componentWillUnmount() 호출됨');
    }

    componentDidUpdate() {
        console.log('componentDidUpdate() 호출됨');
        return true; //true반환: 항상 업데이트
        //false를 반환하면 컴포넌트가 업데이트 되지 않음
    }

    render() {
        console.log('render() 호출됨...');

        return (
            <div className="alert alert-success py-4">
                <h1 style={{ color: this.state.color }}>자식 컴포넌트 LifeCycle</h1>
            </div>
        );
    }
}
