import OurComp from './components/Comp03';

const App = () => {
    return (
        <div className="container py-4">
            <h1>부모 App- 함수형 컴포넌트에서 props전달</h1>
            <hr></hr>
            {/* props로 배경색과 글자색 전달하세요 bgcolor, fgcolor */}
            <OurComp bgcolor="darkred" fgcolor="#fff">
                둘리
            </OurComp>
            <OurComp bgcolor="lightgreen" fgcolor="navy">
                또치
            </OurComp>
            <OurComp />
        </div>
    );
};
export default App;
