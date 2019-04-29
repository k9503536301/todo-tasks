import React from 'react';
import {connect} from "react-redux";

import { fetchTasks } from "../../actions";
import './page-numbers.css';

const PageNumbers = ({ total_task_count, sortParams, currentPage, tasksPerPage, onClickPageNumber })=>{

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(total_task_count / tasksPerPage); i++) {
        pageNumbers.push(i);
    }

    const pageNumberItems = pageNumbers.map(number =>
        (<li key={number}
             id={number}
             onClick={(event) => onClickPageNumber(
                                        sortParams, Number(event.target.id))}
             className={number === currentPage ? "list-item" : "list-item active"}
        >
            {number}
        </li>));

    return (
        <ul className="page-numbers">
            { pageNumberItems }
        </ul>)
};

const mapStateToProps = ({ total_task_count, currentPage, sortParams, tasksPerPage }) => {
    return {  total_task_count, currentPage, sortParams, tasksPerPage }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClickPageNumber: fetchTasks(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PageNumbers);