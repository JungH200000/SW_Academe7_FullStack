// Header.jsx
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="header">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>

                {/* <li>
                    <a href="/">Home</a>
                </li> */}
                <li>
                    <Link to="/signup">Signup</Link>
                </li>
                <li>
                    <Link to="/comp1">MyComp1</Link>
                </li>
                <li>
                    <Link to="/comp2">MyComp2</Link>
                </li>
                <li>
                    <Link to="/users/3">3번 UserDetail</Link>
                </li>
                <li>
                    <Link to="/users/1">1번 UserDetail</Link>
                </li>
                <li>
                    <Link to="/boards?bid=100&page=1&per_page=10">자유게시판</Link>
                </li>
                <li>
                    <Link to="/todo">ToDo</Link>
                </li>
            </ul>
        </header>
    );
}
