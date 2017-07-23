import React from 'react';
import {browserHistory} from 'react-router';


export default class SignInComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: JSON.parse(localStorage.getItem("users")) || [],
            user: {},
            email: '',
            password: '',
            isFormValid: true,
            isStorageCLear: false,
            session: JSON.parse(localStorage.getItem("session")) || null
        };
        this.signInEmail = this.signInEmail.bind(this);
        this.signInPass = this.signInPass.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    signInEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    signInPass(e) {
        this.setState({
            password: e.target.value
        });
    }

    signIn(event) {
        event.preventDefault();
        for (let i = 0; i < this.state.users.length; i++) {
            if (this.state.email === this.state.users[i].email) {
                console.log("Correct email!");
                this.setState({
                    user: this.state.users[i]
                }, function () {
                    this.state.user.password.map((pass) => {
                        if (this.state.password === pass) {
                            localStorage.setItem("session", JSON.stringify({
                                auth: true,
                                userEmail: this.state.user.email
                            }));
                            setTimeout(() => {
                                browserHistory.push('/dashboard');
                            });
                        }
                        else {
                            this.setState({
                                isFormValid: false
                            });
                        }
                    });
                });
            }
            else {
                this.setState({
                    isFormValid: false
                });
            }
        }
    }

    render() {
        return (
            <div className="container sign-in">
                <div className="sign-in-img"></div>
                <form>
                    <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                        <input id="email"
                               type="email"
                               className="form-control"
                               placeholder="Email"
                               value={this.state.email}
                               onChange={this.signInEmail}/>
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                        <input id="email"
                               type="password"
                               className="form-control"
                               placeholder="Password"
                               value={this.state.password}
                               onChange={this.signInPass}/>
                    </div>
                    {
                        this.state.isFormValid ? null :
                            <div className="alert alert-danger">
                                Uncorrect <strong>email</strong> or <strong>password</strong>.
                            </div>
                    }
                    {
                        !this.state.isStorageCLear ? null :
                            <div className="alert alert-danger">
                                <strong>Sign up</strong> firstly please.
                            </div>
                    }
                    <button className="btn btn-primary col-sm-12" onClick={this.signIn}>Sign in</button>
                </form>
            </div>
        )
    }
};