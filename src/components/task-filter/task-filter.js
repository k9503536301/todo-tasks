import React, { Fragment } from 'react';
import { connect } from "react-redux";

import { fetchTasks, toggleFilter } from "../../actions";
import './task-filter.css';

const sorting = [
    {
        name: 'Имя возр',
        sort_field: 'username',
        sort_direction: 'asc'
    },
    {
        name: 'Имя убыв',
        sort_field: 'username',
        sort_direction: 'desc'
    },
    {
        name: 'email возр',
        sort_field: 'email',
        sort_direction: 'asc'
    },
    {
        name: 'email убыв',
        sort_field: 'email',
        sort_direction: 'desc'
    },
    {
        name: 'Сначала в работе',
        sort_field: 'status',
        sort_direction: 'asc'
    },
    {
        name: 'Сначала выполненные',
        sort_field: 'status',
        sort_direction: 'desc'
    }
];

const TaskFilter = ({sortParams, isShow, currentPage, onToggleFilter, onClickFilterItem}) => {

        return (
            <div className="task-filter btn-group">
                <div className={isShow ? 'dropdown show' : 'dropdown'} >
                    <button className="btn btn-outline-secondary dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded={isShow}
                            onClick={onToggleFilter}
                    >
                        {sortParams.name}
                    </button>
                </div>
                <div className={isShow ? 'dropdown-menu show' : 'dropdown-menu'}
                     aria-labelledby="dropdownMenuButton">
                    {
                        sorting.map((item, index )=> {
                            const {name, sort_field, sort_direction} = item;
                            return ( <Fragment key={index}>
                                    <button  className="dropdown-item"
                                             onClick={() => onClickFilterItem(
                                                                    {name, sort_field, sort_direction}, currentPage)}>
                                        {name}
                                    </button>

                                    {index %2 !== 0 ? <div className="dropdown-divider"/> : null}
                                </Fragment>
                            )
                        })
                    }

                </div>
            </div>
        )
};

const mapStateToProps = ({ sortParams, isShow, currentPage }) => {
    return { sortParams, isShow, currentPage }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleFilter: () => dispatch(toggleFilter()),
        onClickFilterItem: fetchTasks(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskFilter);