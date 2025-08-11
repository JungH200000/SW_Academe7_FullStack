// Comp04.jsx
// state를 다루는 예제
// 클래스형 컴포넌트의 state(유동적 데이터)를 사용해보자. ==> this.state를 이용하고
// state값을 변경하고자 할 때는 this.setState() 함수를 이용해서 변경함
import { Component } from 'react';

export default class Demo extends Component {
    constructor(props) {
        super(props); //생성자에서는 반드시 super(props)를 호출해야 한다
        console.log(this);
        //변경할 수 있는 데이터: this.state에 할당
        this.state = {
            name: 'Tom',
            isLogin: false,
        };
        this.onButtonClick2 = this.onButtonClick2.bind(this);
        //일반함수로 이벤트 핸들러를 구성할 경우에는 this를 bind해줘야
        //해당 핸들러 함수에서 this를 이용할 수 있다
    }

    //이벤트 핸들러 함수
    //화살표 함수를 사용하면 this는 Demo 가되는데
    //일반 함수를 사용하면 this는 undefined 가 나온다
    onButtonClick = () => {
        //alert('hi ' + this);
        this.setState({ name: 'Alice' });
    };
    onButtonClick2() {
        //일반함수로 구성할 때는 this가 undefined가 나오므로 this를 생성자에서 할당해주어야 한다
        //alert(this);
        // this.setState({ name: 'Tome' });
        this.setState({ isLogin: !this.state.isLogin });
    }

    render() {
        return (
            <div>
                <h2>Demo -자식 컴포넌트</h2>
                <button className="btn btn-info" onClick={this.onButtonClick}>
                    Click Me
                </button>
                <button className="btn btn-warning" onClick={this.onButtonClick2}>
                    Click Me2
                </button>
                <hr />
                <div>
                    <h3>{this.state.name}님!!</h3>
                    <hr />
                    <h3>조건부 렌더링</h3>
                    {/* jsx에서는 if ~ else 문을 사용할 수 없다.==> [1] 3항 연산자 또는 [2] && 연산자를 사용해야 함 */}
                    {this.state.isLogin ? (
                        <h3 className="text-primary">{this.state.name}님 로그인 중...</h3>
                    ) : (
                        <h3 className="text-danger">로그인 하세요</h3>
                    )}
                    <hr />
                    {/* a && b :  a가 false면 b를 수행하지 않음. a가 true면 b를 체크함 */}
                    {this.state.isLogin && <h3>{this.state.name}님 로그인 중</h3>}
                    {!this.state.isLogin && <h3>로그인을 해야 해요</h3>}
                </div>
            </div>
        );
    }
}
