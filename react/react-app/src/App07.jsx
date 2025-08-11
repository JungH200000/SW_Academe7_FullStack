import { Component } from 'react';
import MyComp from './components/Comp01';
import YourComp from './components/Comp02';

class App extends Component {
    render() {
        return (
            <div className="container py-5">
                <h1 className="text-center">App 부모 컴포넌트 </h1>
                <hr></hr>
                {/* 배경색: mybgcolor  안쪽여백: mypadding, 바깥여백: mymargin */}
                <MyComp mycolor="blue" mybgcolor="#def" mypadding="1em" mymargin="1em" />
                <MyComp mycolor="tomato" mybgcolor="#fec" mypadding="1.3em" mymargin="1.3em"></MyComp>
                <MyComp mycolor="darkgreen" mybgcolor="#cfd" mypadding="1.6em" mymargin="1.6em"></MyComp>
                <hr />
                <YourComp bg="beige">반가워요~</YourComp>
                <YourComp bg="lightblue">
                    <span className="badge badge-danger">안녕하세요?</span>
                </YourComp>
                <YourComp />
            </div>
        );
    }
}
export default App;
