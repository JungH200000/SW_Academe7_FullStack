// TodoList.jsx
// 검색form(input + button)
//TodoListItem
import { FaListAlt } from 'react-icons/fa';
import { Row, Col, Button } from 'react-bootstrap';
import TodoListItem from './TodoListItem';
import { useState } from 'react';

export default function TodoList({ todo, onDelete, onUpdate }) {
    const [search, setSearch] = useState(''); //검색어

    //검색을 수행하는 함수=> 검색 결과(배열)를 반환
    const getSearchResult = () => {
        // filter()함수 활용해서 검색어를 갖는 todo배열을 반환
        //배열에 저장된 객체들 중 content 에 search 키워드를 포함하는 객체들만 배열에 담아 반환
        const tmpTodo =
            search === ''
                ? [...todo]
                : todo.filter((tmp) => {
                      //tmp.content에 search 내용을 포함하는지 검사해서 포함하면 true를 반환
                      //   let findIndex = tmp.content.toLowerCase().indexOf(search.toLowerCase()); //search가 없으면 -1을 반환
                      //   return findIndex !== -1;
                      // 문자열.includes(검색어 ) : 검색어를 포함하고 있으면 true 반환
                      return tmp.content.toLowerCase().includes(search.toLowerCase());
                  });
        console.log('tmpTodo: ', tmpTodo);
        return tmpTodo;
    }; //----------------

    const getTotal = () => {
        //총 개수
        const totalCount = todo.length;
        //완료된 일 개수
        const doneCount = todo.filter((tmp) => tmp.isDone === true).length;
        //해야할 일 개수
        const notDoneCount = totalCount - doneCount;

        return { totalCount, doneCount, notDoneCount };
    };

    const { totalCount, doneCount, notDoneCount } = getTotal();

    return (
        <div>
            <h4 className="my-3">
                {' '}
                <FaListAlt /> ToDo List
            </h4>
            <Row>
                <Col xs={12} sm={8} md={10}>
                    <div className="alert alert-info my-4">
                        <div>총 개수: {totalCount} </div>
                        <div>완료된 일: {doneCount} </div>
                        <div>해야할 일: {notDoneCount} </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={8} md={10}>
                    <input
                        name="search"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        className="form-control"
                        placeholder="검색어를 입력하세요"
                    />
                </Col>
                <Col xs={12} sm={4} md={2} className="text-start">
                    <Button>🔎</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={10} md={10}>
                    {/* TodoListItem */}
                    {getSearchResult().map((obj) => (
                        // <TodoListItem key={obj.id} content={obj.content} wdate={obj.wdate} />
                        <TodoListItem key={obj.id} {...obj} onDelete={onDelete} onUpdate={onUpdate} />
                    ))}
                </Col>
            </Row>
        </div>
    );
}
