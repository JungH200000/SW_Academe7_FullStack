// TodoListItem.jsx
//checkbox + 할일 내용 + 삭제버튼
import { RiDeleteBin6Fill } from 'react-icons/ri';
import './TodoListItem.css';

export default function TodoListItem(props) {
    const { id, content, isDone, wdate, onDelete, onUpdate } = props;

    return (
        <div className="container TodoListItem">
            <div className="chkbox">
                <input type="checkbox" defaultChecked={isDone} onChange={() => onUpdate(id)} />
            </div>
            {/* <div
                className="content"
                style={{ textDecoration: isDone ? 'line-through' : 'none', color: isDone ? 'darkgray' : 'black' }}
            > */}
            <div className={`content ${isDone ? 'done' : ''}`}>{content}</div>
            <div className="wdate">{new Date(wdate).toLocaleDateString()}</div>
            <div className="btDel">
                <span
                    className="badge bg-danger"
                    onClick={() => {
                        onDelete(id);
                    }}
                >
                    <RiDeleteBin6Fill />
                </span>
            </div>
        </div>
    );
}
