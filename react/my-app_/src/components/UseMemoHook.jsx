// UseMemoHook.jsx
/**
 * 
 useMemo 훅은 의존성 배열이 변경될 때만 메모이제이션된 함수가 다시 호출됩니다. 
 useMemo 훅은 성능 최적화를 위해 사용되며, 주로 비용이 많이 드는 
 계산을 메모이제이션하여 불필요한 재계산을 방지합니다.
 [참고: 메모이제이션이란? 함수의 반환값을 저장하여 동일한 입력값에 대해 
 함수가 반복적으로 호출되는 것을 방지하는 방법]
# useMemo 훅의 동작 원리

- 첫 번째 인수는 계산 결과를 반환하는 함수입니다.
- 두 번째 인수는 의존성 배열입니다.

의존성 배열의 값 중 하나라도 변경되면, useMemo 훅은 
첫 번째 인수로 전달된 함수를 다시 실행하여 새로운 값을 계산합니다.
의존성 배열의 값이 변경되지 않으면, 이전에 계산된 값을 재사용
 */
import { useState, useMemo } from 'react';
export default function UseMemoHook() {
    const [num, setNum] = useState('');
    const [list, setList] = useState([]);

    const onClickAdd = () => {
        if (!num) {
            alert('성적을 입력하세요');
            return;
        }
        //list에 입력한 num 추가
        setList([...list, Number(num)]);
        setNum('');
    };
    const getAvg = () => {
        console.log('평균값 계산 중...');
        //list에 저장된 값들의 평균값 구해서 반환하기
        // let sum = 0;
        // for (const val of list) {
        //     sum += val;
        // }
        // let avg = sum / list.length;
        // return avg;
        //배열.reduce(콜백함수, 초기값)
        return (list.reduce((prev, current) => prev + current, 0) / list.length).toFixed(2);
    };
    //const cacheValue = useMemo(함수,배열)
    const avg = useMemo(getAvg, [list]);
    /** 최초 렌더링 시 useMemo내부의 콜백함수(getAvg())가 실행된다
     *  이후 list 배열의 값이 변경될 때만 getAvg()를 다시 실행한다
     *  list가 변경되지 않으면 캐시에 보관했던 avg값을 꺼내서 재사용한다(memoization)
     */

    return (
        <div className="container py-5">
            성적:
            <input
                type="text"
                name="num"
                id="num"
                onChange={(e) => setNum(e.target.value)}
                value={num}
                placeholder="숫자를 입력하세요"
            />
            <button className="btn btn-info" onClick={onClickAdd}>
                등 록
            </button>
            <hr />
            {/* <h1 className="text-danger">평균점수:{getAvg()} 점</h1> */}
            <h1 className="text-primary">{avg}</h1>
            {/* getAvg()함수 내의 console.log()를 확인해보세요
                input에 값을 입력할 때의 차이점 확인
            */}
            <hr />
            <ul>
                {/* map() list에 저장된 점수 출력 */}
                {list.map((score, i) => (
                    <li key={i} style={{ listStyle: 'none' }}>
                        <h3>{score}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
}
