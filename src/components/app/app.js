import React from 'react';
import { connect } from 'react-redux';

import TaskAddForm from "../task-add-form";
import TaskList from '../task-list';
import TaskFilter from '../task-filter';
import ErrorIndicator from '../error-indicator';
import LoginPage from "../login-page";

import './app.css';

const App = ({error}) => {

    return (
        error
            ? <ErrorIndicator/>
            :
            <div className="todo-app">
                <LoginPage/>

                <header className="h3 font-weight-bold"> Добавить задачу</header>
                <TaskAddForm/>

                <div className="h3 font-weight-bold pl-2"> Задачи</div>
                <TaskFilter/>

                <TaskList/>
            </div>)
};

const mapStateToProps = ({error}) => {
    return { error }
};


export default connect(mapStateToProps)(App);