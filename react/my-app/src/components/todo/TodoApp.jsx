// TodoApp.jsx
import { useState, useRef } from 'react';
import { dummyData } from './todoData';
import TodoHeader from './TodoHeader';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

export default function TodoApp() {
    const [todo, setTodo] = useState(dummyData);
    const idRef = useRef(todo.length); //3

    //TodoForm이 전달하는 content를 받아서 todo에 추가하는 로직
    const handleCreate = (content) => {
        // alert(content);
        idRef.current += 1; //id값으로 사용 예정 1씩 증가

        const newItem = { id: idRef.current, content, isDone: false, wdate: new Date().getTime() };
        console.log(newItem.id);

        setTodo([newItem, ...todo]);
    }; //-----------------------

    const handleDelete = (id) => {
        // alert('삭제 id: ' + id);
        const tmpTodo = todo.filter((obj) => obj.id !== Number(id));
        setTodo(tmpTodo);
    }; //-----------------------

    const handleUpdate = (id) => {
        // alert('수정: ' + id);
        //id번의 글을 찾아서 해당 글의 isDone값을 반대로 변경
        /*
        const tmpTodo = [...todo];
        for (let i = 0; i < tmpTodo.length; i++) {
            const tmp = tmpTodo[i];
            if (tmp.id === Number(id)) {
                const obj = { ...tmp, isDone: !tmp.isDone };
                tmpTodo[i] = obj;
                console.log(obj.isDone);
                break;
            }
        } //for----
         */
        const tmpTodo = todo.map((tmp) => (tmp.id === Number(id) ? { ...tmp, isDone: !tmp.isDone } : tmp));
        setTodo(tmpTodo);
    }; //----------------------------------

    return (
        <div>
            <TodoHeader />
            <TodoForm onInsert={handleCreate} />
            <TodoList todo={todo} onDelete={handleDelete} onUpdate={handleUpdate} />
        </div>
    );
}
