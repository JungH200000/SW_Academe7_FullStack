// UseNavigateHook.jsx
import { useNavigate } from 'react-router-dom';

export default function UseNavigateHook() {
    const navigate = useNavigate();

    const handleClick1 = () => {
        window.location.href = '/todo'; //비권장
    };
    const handleClick2 = () => {
        navigate('/boards?bid=200&page=11&per_page=50'); //권장
    };

    return (
        <div>
            <h1>useNavigate() 훅</h1>
            <p>React Router에서 제공. 페이지를 이동 시키는 훅</p>
            <hr />
            <button className="btn btn-info mx-1" onClick={handleClick1}>
                Go to Todo
            </button>
            <button className="btn btn-secondary" onClick={handleClick2}>
                Go to Boards
            </button>
            <button className="btn btn-success mx-1" onClick={() => navigate('/hook2')}>
                Go to Clock
            </button>
        </div>
    );
}
