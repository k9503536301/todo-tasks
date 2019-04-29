const initialState = {
    tasks: [],
    total_task_count: 1,
    currentPage: 1,
    tasksPerPage: 3,
    loading: false,
    isShow:false,
    isWarning:false,
    isLogged:false,
    isDataSending: false,
    error: false,
    sortParams: {
        name: 'Сортировать',
        sort_field: 'id',
        sort_direction: 'asc'}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_TASKS_REQUEST':
            return {
                ...state,
                tasks: [],
                loading: true,
                error: false
            };

        case 'FETCH_TASKS_SUCCESS':
            const {tasks, total_task_count, currentPage} = action.payload;
            return {
                ...state,
                tasks,
                total_task_count,
                currentPage,
                isShow:false,
                loading: false,
                error: false
            };

        case 'FETCH_TASKS_FAILURE':
            return {
                ...state,
                tasks: [],
                loading: false,
                error: true
            };

        case 'OUTPUT_WARNING_MESSAGE':
            return {...state, isWarning: action.payload};

        case 'LOGGED_ADMIN':
            return {...state, isLogged: action.payload};

        case 'TOGGLE_FILTER':
            const newStatus=!state.isShow;
            return {...state, isShow: newStatus};

        default:
            return state;
    }
};

export default reducer;

