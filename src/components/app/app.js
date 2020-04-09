import React, { Component } from 'react'

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import InputNewTask from '../input-new-task'

/**
 * Глобальный React компонент, который содержит все наше приложение
 */
class App extends Component {

    //начальное значение для генератора id
    numId = 100;

    state = {
        /**
         * Массив из начальный дел
         * 
         * label - название дела
         * important - важность (true - важно, false - нет)
         * done - сделанные дела
         */
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch'),
        ],

        searchTag: 'All',
    };

    createTodoItem(label){
        return {
            label,
            important: false,
            done: false,
            id: this.numId++,
            isView: true,
            viewTag: true,
        };
    };

    toggleProperty(arr, id, propName){
        const mTodoData = [...arr];
        let elem = mTodoData.find(({id: elemId}) => (id === elemId));
        elem[propName] = !elem[propName];
        if (propName === 'done')
            elem.viewTag = !elem.viewTag; 
        return mTodoData;
    }

    deleteItem = (id) => {
        this.setState(({ todoData, toDo, done: numDone }) => {
            const iter = todoData.findIndex(({id: elemId}) => elemId === id);
            const mTodoData = [...todoData.slice(0, iter), ...todoData.slice(iter + 1, todoData.length)];
            return {
                todoData: mTodoData,
            }
        });
    };

    addItem = (text) => {

        const newItem = this.createTodoItem(text);
        newItem.viewTag = !(this.state.searchTag === 'Done');
        this.setState(({ todoData, toDo }) => {
            const mTodoData = [...todoData, newItem];
            return {
                todoData: mTodoData,
            }
        });
    };

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return{
                todoData: this.toggleProperty(todoData, id, 'important'),
            }
        });
    };

    onToggleDone = (id) => {
        this.setState(({todoData, done, toDo}) => {
            return{
                todoData: this.toggleProperty(todoData, id, 'done'),
            }
        });
    };

    onSearch = (event) => {
        const {todoData} = this.state;
        const newTodoData = [...todoData];
        const search = event.target.value;
        newTodoData.forEach((elem) => (elem.isView = (elem.label.indexOf(search) === 0)));
        this.setState({
            todoData: newTodoData,
        });
    }

    onChangeSearchTag = (tag) => {
        const newTodoData = [...this.state.todoData];
        newTodoData.forEach((elem) => {
            elem.viewTag = ((tag === 'All')
                            || (tag === 'Done' && elem.done)
                            || (tag === 'Active' && !elem.done));
        });
        this.setState({
            searchTag: tag,
            todoData: newTodoData,
        });
    }

    render() {
        const { todoData } = this.state;

        const done = todoData.filter(({ done }) => done).length;
        const toDo = todoData.length - done;

        return (
            <div className='todo-app'>
                <AppHeader toDo={toDo} done={done}/>
                <div className='top-panel d-flex'>
                    <SearchPanel onSearch={this.onSearch}/>
                    <ItemStatusFilter onChangeSearchTag={this.onChangeSearchTag}
                    searchTag={this.state.searchTag}/>
                </div>

                <TodoList
                    todos={todoData}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}/>

                <InputNewTask 
                    onAddItem={this.addItem}/>
            </div>
        );
    }
};

export default App;