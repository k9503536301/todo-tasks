import React, { Component } from 'react';

import FormMessage from '../form-message';
import UxCandyApi from '../../services/uxcandy-api.js';

import './task-add-form.css';

const uxCandyApi = new UxCandyApi();

export default class TaskAddForm extends Component {
    state = {
        username: "",
        email: "",
        text: "",
        formErrors: { username: "", email: "", text: "" },
        isValidEmail: false,
        isValidName: false,
        isValidText: false,
        formValid: false,
        isDataSending:false,
        sendingReject:false
    };

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let isValidName = this.state.isValidName,
            isValidEmail = this.state.isValidEmail,
            isValidText = this.state.isValidText;

        switch (fieldName) {
            case "username":
                isValidName = value.length >= 3;
                fieldValidationErrors.username = isValidName ? "" : " is too short";
                break;
            case "email":
                isValidEmail = value.match(
                    /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
                );
                fieldValidationErrors.email = isValidEmail ? "" : " is invalid";
                break;
            case "text":
                isValidText = value.length >= 6;
                fieldValidationErrors.text = isValidText ? "" : " is too short";
                break;
            default:
                break;
        }
        this.setState(
            {
                formErrors: fieldValidationErrors,
                isValidName,
                isValidEmail,
                isValidText
            },
            this.validateForm
        );
    };

    validateForm() {
        this.setState({
            formValid: this.state.isValidName && this.state.isValidEmail && this.state.isValidText
        });
    }

    onSubmit = event => {
        event.preventDefault();

        const { username, email, text } = this.state;

        this.setState({
            username: "",
            email: "",
            text: "",
            formErrors: { username: "", email: "", text: "" },
            isValidEmail: false,
            isValidName: false,
            isValidText: false,
            formValid: false
        });

        const cb = this.createTask || (() => {});
        cb({ username, email, text });

    };

    createTask = (task) =>{
        uxCandyApi.postNewTask(task)
            .then(() => {this.setState({isDataSending: false})})
            .catch(() => {this.setState({sendingReject:true})})
    };

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    };

    errorClass = (error) => error.length === 0 ? "" : "has-error";

    render() {
        const { username, email, text, formErrors, formValid } = this.state;
        return (
            <form className="add-form-panel" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className={`form-control ${this.errorClass(formErrors.username)}`}
                        value={username}
                        name="username"
                        placeholder="Имя"
                        onChange={this.onChange}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        className={`form-control ${this.errorClass(formErrors.email)}`}
                        value={email}
                        name="email"
                        placeholder="email"
                        onChange={this.onChange}
                    />
                </div>

                <div className="form-group">
                  <textarea
                      className={`form-control ${this.errorClass(formErrors.text)}`}
                      name="text"
                      value={text}
                      rows="3"
                      placeholder="Описание"
                      onChange={this.onChange}
                  />
                </div>

                <div className="d-inline-flex">
                    <span>
                        <button
                            type="submit"
                            className="btn btn-secondary"
                            disabled={!formValid}
                        >
                            Добавить
                        </button>
                    </span>

                    <FormMessage formErrors={formErrors}
                                 isDataSending={this.state.isDataSending}
                                 sendingReject={this.state.sendingReject}/>
                </div>
            </form>
        );
    }
};