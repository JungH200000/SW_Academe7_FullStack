function GetBrand() {
    return <h2>내 노트북은 LG Gram 입니다</h2>;
}
function GetOS() {
    return <h2>내가 사용하는 운영체제는 Windows입니다</h2>;
}
export default function GetLang() {
    return <h2>내가 사용하는 언어는 React.js입니다</h2>;
}
function GetJob() {
    return <h2>나의 직업은 프런트엔드 개발자 입니다</h2>;
}

export { GetBrand, GetOS, GetJob };
