// TodoHeader.jsx
import React from 'react';

export default function TodoHeader() {
    return (
        <div className="py-4">
            <h1>오늘 할 일 (To Do List)</h1>
            <h2> 📅 {new Date().toLocaleDateString()} </h2>
        </div>
    );
}
