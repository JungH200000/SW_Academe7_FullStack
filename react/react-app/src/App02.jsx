// import JsxEx02, Ex02 해서 수평선 아래 붙여보세요
// import JsxEx02 from './example/JsxEx02'; [x] export default로 내보낼 경우의 import방식임
// import { JsxEx02, Ex02 } from './example/JsxEx02'; //export로 내보냄
import * as Comp from './example/JsxEx02';
// JsxEx02모듈의 모든 것을 가져와서 Comp라는 별칭으로 참조하겠단 의미

export default function App() {
    return (
        <div className="container py-5">
            <h1>App02.jsx</h1>
            <hr />
            <Comp.JsxEx02 />
            <Comp.Ex02 />
        </div>
    );
}
