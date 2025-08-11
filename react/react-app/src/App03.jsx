//GetBrand, GetOS import 하세요
// import { GetBrand, GetOS } from './example/JsxEx03';
import { GetBrand as Brand, GetOS as OS } from './example/JsxEx03';
// 별칭을 주어 사용
import Lang from './example/JsxEx03'; //export default한 경우 다른 이름으로 import 가능
import { GetJob } from './example/JsxEx03';
// GetLang, GetJob import
export default function App() {
    return (
        <div>
            <h1>App03.jsx</h1>
            <hr />
            {/* <GetBrand />
            <GetOS /> */}
            <Brand />
            <OS />
            <hr />
            <Lang />
            <GetJob />
        </div>
    );
}
