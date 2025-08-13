// TodoForm.jsx
import { Row, Col, Button } from 'react-bootstrap';
import { BsPencilFill } from 'react-icons/bs';
import { IoAddCircle } from 'react-icons/io5';
import { RiResetLeftFill } from 'react-icons/ri';
import { useState, useRef, useEffect } from 'react';

export default function TodoForm({ onInsert }) {
    const [content, setContent] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
        // 컴포넌트가 마운트되고나면 입력 포커스 주기
    }, []);

    const onChangeHandler = (evt) => {
        setContent(evt.target.value);
    };
    const onResetHandler = () => {
        setContent('');
        inputRef.current.focus();
    };
    const onSubmitHandler = () => {
        // 입력값 유효성 체크
        if (!content) {
            alert('할 일을 입력해야 해요');
            inputRef.current.focus();
            return;
        }
        // content값을 부모(TodoApp)에 전달
        onInsert(content);

        // 입력값 초기화. 입력 포커스 주기
        onResetHandler();
    };

    const onKeyDownHandler = (evt) => {
        console.log('keyCode: ', evt.keyCode, 'key: ', evt.key);
        if (evt.key === 'Enter') {
            //엔터 입력시
            onSubmitHandler();
        }
    };

    return (
        <div>
            <h4 className="my-3">
                {' '}
                <BsPencilFill /> 새로운 ToDo 추가
            </h4>
            <Row>
                <Col xs={12} sm={8} md={10} className="mx-0">
                    <input
                        name="content"
                        ref={inputRef}
                        onChange={onChangeHandler}
                        onKeyDown={onKeyDownHandler}
                        value={content}
                        className="form-control"
                        placeholder="할 일을 쓰세요"
                    />
                </Col>
                <Col xs={12} sm={4} md={2} className="d-flex">
                    <Button variant="outline-success" onClick={onSubmitHandler}>
                        <IoAddCircle />
                    </Button>
                    <Button variant="outline-danger" className="mx-1" onClick={onResetHandler}>
                        <RiResetLeftFill />
                    </Button>
                </Col>
            </Row>
        </div>
    );
}
