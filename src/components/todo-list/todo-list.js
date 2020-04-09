import React from "react";

import TodoListItem from '../todo-list-item';

import './todo-list.css';

const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {

    const elements = todos.filter(({ isView, viewTag }) => isView && viewTag)
                            .map(({id, ...item}) => {
        return (
            <li key={id} className="list-group-item">
                <TodoListItem {...item}
                onDeleted={() => onDeleted(id)}
                onToggleImportant={() => onToggleImportant(id)}
                onToggleDone={() => onToggleDone(id)}/>
            </li>
        );
    });
    return (
        <ul className="list-group todo-list">
            {elements}
        </ul>
    );
};

export default TodoList