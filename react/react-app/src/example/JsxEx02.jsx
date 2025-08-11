// JsxEx02.jsx : 컴포넌트를 2개 이상 만들어서 export해보자
// export default로는 1개의 컴포넌트만 내보낼 수 있다.
export function JsxEx02() {
    return (
        <fragment>
            <label htmlFor="userName">이름</label>
            <input type="text" name="name" id="userName" placeholder="Name" className="form-control" />
        </fragment>
    );
}
export function Ex02() {
    return (
        <>
            {/* fragment 축약 */}
            <h2 className="text-danger my-3">반가워요 리액트</h2>
        </>
    );
}
