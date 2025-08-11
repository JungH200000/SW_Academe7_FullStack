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
                    <Link to="/comp1">MyComp1</Link>
                </li>
                <li>
                    <Link to="/comp2">MyComp2</Link>
                </li>
            </ul>
        </header>
    );
}
