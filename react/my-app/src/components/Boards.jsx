// Boards.jsx
import { useSearchParams } from 'react-router-dom';

//http://localhost:5173/boards?bid=100&page=1&per_page=10 ==> URL
// /boards ==> URI
//?bid=100&page=1&per_page=10 ==> Query String ===> useSearchParams훅을 이용해서 추출
export default function Boards() {
    const [params] = useSearchParams();
    console.log('params: ', params); //URLSearchParams객체를 반환
    console.log('params.size: ', params.size); //3

    //사본 배열
    const search = [...params];
    console.log('search: ', search); //2차원 배열
    /**
     * [
     *      ['bid','100'],
     *      ['page','1'],
     *      ['per_page','10']
     * ]
     *
     */

    return (
        <div>
            <h1>Boards</h1>
            <h2>useSearchParams훅을 이용해 파라미터 정보 추출</h2>
            <hr></hr>
            {search.map((param, idx) => (
                <div key={idx}>
                    <h3>
                        {param[0]} : {param[1]}{' '}
                    </h3>
                </div>
            ))}
            <hr></hr>
            <div className="alert alert-warning">
                <h2>bid: {params.get('bid')} </h2>
                <h2>page: {params.get('page')} </h2>
                <h2>per_page: {params.get('per_page')} </h2>
            </div>
        </div>
    );
}
