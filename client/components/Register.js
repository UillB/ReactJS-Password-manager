import React from 'react';
import {browserHistory} from 'react-router';
import validator from 'email-validator';


export default class RegisterComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: JSON.parse(localStorage.getItem("users")) || [],
            name: '',
            email: '',
            validEmail: true,
            isEmailExist: false,
            password: '',
            confirmPassword: '',
            confirmPasswords: true,
            session: JSON.parse(localStorage.getItem("session")) || null,
            validForm: true
        };

        this.createName = this.createName.bind(this);
        this.createEmail = this.createEmail.bind(this);
        this.createPass = this.createPass.bind(this);
        this.confirmPass = this.confirmPass.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    componentWillMount() {
        if (this.state.session && this.state.session.auth) {
            browserHistory.push('/dashboard');
        }
    }


    createName(e) {
        this.setState({
            name: e.target.value
        });
    }

    createEmail(e) {
        this.setState({
            email: e.target.value,
            validEmail: validator.validate(e.target.value)
        });
    }

    createPass(e) {
        this.setState({
            password: e.target.value
        });
    }

    confirmPass(e) {
        this.setState({
            confirmPassword: e.target.value,
            confirmPasswords: e.target.value === this.state.password ? true : false
        });
    }

    createUser(event) {
        event.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: [this.state.password],
            confirmPassword: this.state.confirmPassword
        };


        if (
            newUser.name.trim() !== '' &&
            (newUser.email.trim() !== '' && this.state.validEmail) &&
            newUser.password[0].trim() !== '' &&
            (newUser.password[0].trim() === newUser.confirmPassword.trim())) {
            let isExist = false;
            for (let i = 0; i < this.state.users.length; i++) {
                if (!isExist) {
                    isExist = newUser.email === this.state.users[i].email
                }
            }
            if (!isExist) {
                this.setState({
                    users: this.state.users.push(newUser),
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    confirmPasswords: true
                });
                localStorage.setItem("session", JSON.stringify({auth: true, userEmail: newUser.email}));
                localStorage.setItem("users", JSON.stringify(this.state.users));
                setTimeout(() => {
                    browserHistory.push('/dashboard');
                });
            }
            else {
                this.setState({
                    isEmailExist: true
                });
            }
        } else {
            this.setState({
                validForm: false
            });
        }
    }

    render() {
        return (
            <div className="container register">
                <div className="register-img"></div>
                <form>
                    <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-user-circle"></i></span>
                        <input id="email"
                               type="text"
                               className="form-control"
                               placeholder="Name"
                               value={this.state.name}
                               onChange={this.createName}/>
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                        <input id="email"
                               type="email"
                               className="form-control"
                               placeholder="Email"
                               value={this.state.email}
                               onChange={this.createEmail}/>
                    </div>
                    {
                        this.state.validEmail ? null :
                            <div className="alert alert-danger">
                                Uncorrect email. You must have an email like <strong>someone@email.com</strong>
                            </div>
                    }
                    {
                        !this.state.isEmailExist ? null :
                            <div className="alert alert-danger">
                                Sorry, but this email is already <strong>exist</strong>
                            </div>
                    }
                    <div className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                        <input id="password"
                               type="password"
                               className="form-control"
                               placeholder="Password"
                               value={this.state.password}
                               onChange={this.createPass}/>
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                        <input id="password"
                               type="password"
                               className="form-control"
                               placeholder="Confirm password"
                               value={this.state.confirmPassword}
                               onChange={this.confirmPass}/>
                    </div>
                    {
                        this.state.confirmPasswords ? null :
                            <div className="alert alert-danger">
                                <strong>Confirm</strong> your password please!
                            </div>
                    }
                    {
                        this.state.validForm ? null :
                            <div className="alert alert-danger">
                                Something wrong with your fields. Seems like of them is <strong>empty</strong>.
                            </div>
                    }
                    <button className="btn btn-default col-sm-12" onClick={this.createUser}>Sign up</button>
                </form>
            </div>
        )
    }
}