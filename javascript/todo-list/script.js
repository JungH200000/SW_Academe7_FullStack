// DOM 요소가 모두 로드된 후에 스크립트 실행
document.addEventListener('DOMContentLoaded', () => {
  // 필요한 DOM 요소 가져오기
  const todoInput = document.getElementById('todo-input');
  const addButton = document.getElementById('add-button');
  const todoList = document.getElementById('todo-list');

  addButton.addEventListener('click', addTodo);

  todoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  });

  // 할 일 추가
  function addTodo() {
    const todoText = todoInput.value.trim(); // 입력값의 양쪽 공백 제거

    if (todoText !== '') {
      const li = document.createElement('li');
      li.className = 'todo-item';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.addEventListener('change', () => {
        li.classList.toggle('completed');
      });

      const span = document.createElement('span');
      span.textContent = todoText;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = '삭제';
      deleteButton.className = 'delete-button';
      deleteButton.addEventListener('click', () => {
        todoList.removeChild(li);
      });

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteButton);

      todoList.appendChild(li);

      // 입력창 초기화 및 포커스
      todoInput.value = '';
      todoInput.focus();
    }
  }
});
