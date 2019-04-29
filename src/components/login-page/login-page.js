import React from "react";
import { connect } from "react-redux";

import { loggedAdmin } from "../../actions";
import './login-page.css';

class LoginPage extends React.Component {
    state = {
            status: "idle",
            login : "",
            password : "",
            loginData: { login : "admin", password : "123"}
    };

    onChange = (event) => {
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    };

    onSave = (event) => {
        event.preventDefault();
        const { login, password, loginData } = this.state;

        if (login === loginData.login && password === loginData.password) {
            this.props.loggedAdmin(true);
            this.setState({status:"logged"});
        }

        else this.setState({status:"error"});
    };

    renderForm = () =>{
        return (<form className="form-group d-flex">

                <input name="login"
                       className="form-control"
                       value={this.state.login}
                       placeholder="введите логин"
                       onChange={this.onChange} />

                <input name="password"
                       type="password"
                       value={this.state.password}
                       placeholder="введите пароль"
                       className="form-control"
                       onChange={ this.onChange.bind(this) } />

                <button className="btn btn-primary"
                        onClick={ this.onSave }>Войти</button>
        </form>)
    };

    renderStatus = () =>{
        if (this.state.status === "logged") {
            return (<div className="alert alert-info rounded" role="alert">
                        Вы авторизованы!
                    </div>)
        }

        else if (this.state.status === "error"){
            return (<div className="alert alert-warning rounded" role="alert">
                    Введен неверный e-mail или пароль
                </div>)
        }
    };

    render() {
        return (<div className="col">
            {this.props.isWarning ?
                (<div className="alert alert-danger rounded" role="alert">
                    У вас нет права на редактирование, пожалуйста, авторизуйтесь
                </div>)
                : null}

            {this.state.status !== "logged" && this.renderForm()}
            {this.renderStatus()}
        </div>)
    };
}

const mapStateToProps = ({ isWarning }) => {
    return { isWarning }
};

const mapDispatchToProps = {
    loggedAdmin
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);