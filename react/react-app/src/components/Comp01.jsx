// 부모컴포넌트: App07.jsx의 App
// 자식컴포넌트: Comp01
// class형으로 구현
import { Component } from 'react';

class Comp01 extends Component {
    render() {
        //클래스형: 부모가 넘겨준 속성들을 this.props로 참조한다
        console.log('mycolor=', this.props.mycolor);
        const { mycolor, mybgcolor, mypadding: pad, mymargin: mg } = this.props;
        const divStyle = {
            backgroundColor: mybgcolor,
            padding: pad,
            margin: mg,
        };

        return (
            <div style={divStyle}>
                <h2 style={{ color: mycolor }}>자식 컴포넌트 Comp01</h2>
            </div>
        );
    }
}
export default Comp01;
