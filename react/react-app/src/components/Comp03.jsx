// Comp03.jsx
// 함수형 컴포넌트로 props 다뤄보자
//부모: App(App08.jsx)
//자식: OurComp
//함수형에서는 매개변수로 props를 받는다
const OurComp = (props) => {
    console.log(props.bgcolor);
    const { bgcolor = 'beige', fgcolor = 'darkcyan', children = '고길동' } = props;
    return (
        <div className="py-3 my-3" style={{ backgroundColor: bgcolor }}>
            <h2 style={{ color: fgcolor }}>OurComp 함수형 컴포넌트: {children} </h2>
        </div>
    );
};

export default OurComp;
