// TodoApp.jsx
import { useState } from 'react';
import { dummyData } from './todoData';
import TodoHeader from './TodoHeader';
export default function TodoApp() {
    const [todo, setTodo] = useState(dummyData);

    return (
        <div>
            {/* TodoHeader */}
            <TodoHeader />
            {/* TodoForm  */}
            {/* TodoList */}
        </div>
    );
}
