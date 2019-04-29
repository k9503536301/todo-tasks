import UxCandyApi from "./services/uxcandy-api";

const uxCandyApi = new UxCandyApi();

const tasksRequested = () => {
    return {
        type: 'FETCH_TASKS_REQUEST'
    }
};

const tasksLoaded = (tasks, total_task_count, currentPage) => {
    return {
        type: 'FETCH_TASKS_SUCCESS',
        payload: { tasks, total_task_count, currentPage }
    };
};

const tasksError = (error) => {
    return {
        type: 'FETCH_TASKS_FAILURE',
        payload: error
    };
};

const warningMessage =(isWarning) => {
    return {
        type: 'OUTPUT_WARNING_MESSAGE',
        payload: isWarning
    }
};

const loggedAdmin = (isLogged) => {
    return {
        type: 'OUTPUT_WARNING_MESSAGE',
        payload: isLogged
    }
};

const toggleFilter = () => {
    return {
        type: 'TOGGLE_FILTER'
    }
};

const fetchTasks = (dispatch) => (sortParams, currentPage) => {
    dispatch(tasksRequested());
    uxCandyApi.getTasksOnSelectedPage(sortParams, currentPage)
        .then(({ tasks, total_task_count }) => dispatch(tasksLoaded(tasks, total_task_count, currentPage)))
        .catch(() => dispatch(tasksError()));
};

export {
    fetchTasks,
    warningMessage,
    loggedAdmin,
    toggleFilter
}