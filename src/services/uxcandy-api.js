import md5 from 'md5';

export default class UxCandyApi {
    _apiBase = 'https://uxcandy.com/~shapoval/test-task-backend';
    _params ={
        developer: '/?developer=kirill',
        page: '&page=',
        sort_field: '&sort_field=',
        sort_direction: '&sort_direction=',
    };
    _apiCreateUrl = 'https://uxcandy.com/~shapoval/test-task-backend/create?developer=kirill';
    _token = 'beejee';

    async getTasksOnSelectedPage(sortParams, currentPage){
        const { sort_field, sort_direction } = sortParams;

        const querySortString = this._params.sort_field + sort_field + this._params.sort_direction + sort_direction;

        const url = this._apiBase + this._params.developer + this._params.page + currentPage + querySortString;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Could not fetch ${this._apiBase}${currentPage}` +
                `, received ${response.status}`)
        }

        const { message } = await response.json();

        return message;
    }

    async postNewTask(task){
        let formData  = new FormData();

        for (let name in task) {
            formData.append(name, task[name]);
        }

        const response = await fetch(this._apiCreateUrl, {
                method: "POST",
                body: formData
            });

        if (!response.ok) {
            throw new Error(`Could not fetch ${this._apiCreateUrl}` +
                `, received ${response.status}`)
        }

        const { message } = await response.json();

        return message
    }

    async editTask(id, data){
        let name = null, value = null;
        if ((typeof data) === 'string') {
            name = 'text';
            value = data;
        }
        else {
            name = 'status';
            value = data === 10 ? 0 : 10;
        }

        const params_string = encodeURI(`${name}=${value}&token=${this._token}`);
        const md5Hash = md5(params_string);

        const url = `${this._apiBase}/edit/${id}${this._params.developer}`;

        let formData  = new FormData();
        formData.append( name , value );
        formData.append('signature', md5Hash);
        formData.append('token', this._token);

        const response = await fetch(url, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${response.status}`)
        }

        const body = await response.json();

        return body.status;
    }
};