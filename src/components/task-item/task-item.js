import React, {Component, Fragment} from 'react';

import './task-item.css';

export default class TaskItem extends Component {
    state={
        editing:false,
        label:null
    };

    onSubmit = (event) =>{
        event.preventDefault();
        this.props.onEditTaskText(this.state.label);
        this.setState({editing:false, label : null});
    };

    renderEditForm = () =>{
        const { task } = this.props;

        return (
            <form onSubmit={this.onSubmit}>
                <input type="text"
                       autoFocus
                       className="form-control"
                       ref="label"
                       defaultValue={task.text}
                       onChange={(event)=>this.setState({label:event.target.value})}/>
            </form>)
    };

    render() {
    const { task, onEditTaskStatus } = this.props;
    const { username, email, text, status } = task;

    const textItem = this.state.editing ? this.renderEditForm() : text;

    return (<Fragment>
            <td>{username}</td>
            <td>{email}</td>
            <td onClick={()=>this.setState({editing:true})}
                onFocus={(event) => event.target.select()}
                onBlur={()=>this.setState({editing:false})}>
                { textItem }</td>
            <td>
                <button type="button"
                        className="btn btn-outline-secondary border-0 checkbox"
                        onClick={onEditTaskStatus}>
                    <i className="material-icons">
                        {+status === 10 ? 'check_box' : 'check_box_outline_blank'}
                    </i>
                </button>
            </td>
        </Fragment>)
    }
};