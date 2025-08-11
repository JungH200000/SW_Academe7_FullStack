// MyApp.css import해서 적용시키세요
import '../style/MyApp.css';

const wrapStyle = {
    border: '3px inset purple',
    height: '100vh',
    width: '90%',
    margin: 'auto',
    textAlign: 'center',
};
// div에 wrapStyle 적용시키세요
export default function MyApp() {
    return (
        <div style={wrapStyle} className="App">
            <header>
                <h1>React CSS</h1>
            </header>
            <section>
                <h2>React에 외부 css 적용해봅시다</h2>
            </section>
        </div>
    );
}
