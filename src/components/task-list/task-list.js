import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import TaskItem from '../task-item';
import PageNumbers from '../page-numbers';

import UxCandyApi from '../../services/uxcandy-api.js';

import { fetchTasks, warningMessage } from '../../actions'

import './task-list.css';

const uxCandyApi = new UxCandyApi();

class TaskList extends Component {
    componentDidMount() {
        const { currentPage, sortParams, fetchTasks } = this.props;

        fetchTasks(sortParams, currentPage);
    }

    onEditTask = (id, data) => {
        if (!this.props.isLogged) {
            this.props.warningMessage(true);
            return;
        }

        uxCandyApi.editTask(id, data).then(() =>{
            const { currentPage, sortParams, fetchTasks } = this.props;

            fetchTasks(sortParams, currentPage);
        })
    };

    render() {
        const { tasks } = this.props;

        const tasksTableBody = tasks.map((task) =>(
            <tr key={task.id}>
                <TaskItem task={ task }
                          onEditTaskStatus={() => this.onEditTask(task.id, task.status)}
                          onEditTaskText={(label) => this.onEditTask(task.id, label)}/>
            </tr>
        ));

        const tableHeadItem = ['Имя', 'Email', 'Текст', 'Статус'];

        return (
                <Fragment>
                    <div className="todo-list">
                        <table className="table">
                            <thead>
                                <tr>
                                    {tableHeadItem.map((item,idx) => <th key={idx} scope="col align-self-center">{item}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {tasksTableBody}
                            </tbody>
                        </table>
                    </div>

                    <PageNumbers/>

                </Fragment>)
    }
};

const mapStateToProps = ({ tasks, currentPage, sortParams, isLogged }) => {
    return {  tasks, currentPage, sortParams, isLogged }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTasks: fetchTasks(dispatch),
        warningMessage: (isWarning) => dispatch(warningMessage(isWarning))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);