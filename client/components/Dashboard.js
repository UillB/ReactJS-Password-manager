import React from 'react';
import {browserHistory} from 'react-router';


export default class DashboardComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            session: JSON.parse(localStorage.getItem("session")) || {},
            password: '',
            edit: false,
            valid: true,
            showPass: false,
            showDeleteText: false,
            showEditText: false,
            isPasswordExist: false,
            isPasswordLast: false,
            editedPassExist: false
        };

        this.newPassValue = this.newPassValue.bind(this);
        this.addNewPass = this.addNewPass.bind(this);
        this.editPass = this.editPass.bind(this);
        this.updatePass = this.updatePass.bind(this);
        this.saveUpdatedPassword = this.saveUpdatedPassword.bind(this);
        this.showDeleteBtn = this.showDeleteBtn.bind(this);
        this.hideDeleteBtn = this.hideDeleteBtn.bind(this);
        this.showEditBtn = this.showEditBtn.bind(this);
        this.hideEditBtn = this.hideEditBtn.bind(this);
    }

    componentWillMount() {
        if (this.state.session && this.state.session.auth) {
            let users = JSON.parse(localStorage.getItem("users"));
            console.log(this.state.session.userEmail);
            for (let i = 0; i < users.length; i++) {
                if (this.state.session.userEmail === users[i].email) {
                    this.setState({
                        user: users[i],
                        userPasswords: users[i].password
                    })
                }
            }
            ;
        }
        else {
            browserHistory.push('/register');
        }
    }

    newPassValue(e) {
        this.setState({
            password: e.target.value
        })
    }

    addNewPass() {
        if (this.state.password.trim() === '') {
            this.setState({
                valid: false
            });
            setTimeout(() => {
                this.setState({
                    valid: true
                });
            }, 3000);
            return;
        }
        let users = JSON.parse(localStorage.getItem("users"));
        users.map((user) => {
            if (this.state.user.email === user.email) {
                for (let i = 0; i < user.password.length; i++) {
                    if (user.password[i] === this.state.password) {
                        this.setState({
                            isPasswordExist: true
                        });
                        return
                    }
                }
                user.password.push(this.state.password)
            }
        });
        console.log(users);
        localStorage.removeItem("users");
        localStorage.setItem("users", JSON.stringify(users));

        let userLog = this.state.user.email;
        this.setState({
            password: '',
            user: users.find((user) => (userLog === user.email)),
            valid: true
        })
    }

    deletePass(pass) {
        if (this.state.user.password.length > 1) {
            let newPasswords = this.state.user.password.filter((password) => (password !== pass));
            let users = JSON.parse(localStorage.getItem("users"));
            users.map((user) => {
                if (this.state.user.email === user.email) {
                    user.password = newPasswords
                }
            });
            localStorage.removeItem("users");
            localStorage.setItem("users", JSON.stringify(users));
            let userLog = this.state.user.email;
            this.setState({
                password: '',
                user: users.find((user) => (userLog === user.email))
            })
        }
        else {
            this.setState({
                isPasswordLast: true
            });
            setTimeout(() => {
                this.setState({
                    isPasswordLast: false
                });
            }, 3000);
        }
    }


    editPass(pass) {
        this.setState({
            edit: true,
            editPassword: pass,
            editNewPassword: pass
        })
    }

    updatePass(e) {
        this.setState({
            editNewPassword: e.target.value
        })
    }

    saveUpdatedPassword() {
        if (this.state.editNewPassword.trim() === '') {
            this.setState({
                valid: false
            });
            setTimeout(() => {
                this.setState({
                    valid: true
                });
            }, 3000);
            return;
        }
        let users = JSON.parse(localStorage.getItem("users"));
        users.map((user) => {
            if (this.state.user.email === user.email) {
                for (let i = 0; i < user.password.length; i++) {
                    if (user.password[i] === this.state.editNewPassword) {
                        this.setState({
                            editedPassExist: true
                        });
                        setTimeout(() => {
                            this.setState({
                                editedPassExist: false
                            });
                        }, 3000)
                        console.log("Parol uze est!");
                        return
                    }
                }
                let newPasswords = [];
                for (let i = 0; i < user.password.length; i++) {
                    if (user.password[i] !== this.state.editPassword) {
                        newPasswords.push(user.password[i]);
                    }
                    else {
                        newPasswords.push(this.state.editNewPassword);
                    }
                }
                user.password = newPasswords;
            }
        });
        console.log(users);
        localStorage.removeItem("users");
        localStorage.setItem("users", JSON.stringify(users));
        let userLog = this.state.user.email;
        this.setState({
            password: '',
            edit: false,
            editPassword: '',
            editNewPassword: '',
            user: users.find((user) => (userLog === user.email))
        });
    }

    hidePass(pass) {
        this.setState({
            showPass: false
        });
        console.log(pass.replace(/./g, '*'));
    }

    showPass(pass) {
        this.setState({
            showPass: true
        });
        console.log(pass)
        console.log(this.state.user.password)
    }

    showDeleteBtn(){
        this.setState({
            showDeleteText: true
        })
    }

    hideDeleteBtn(){
        this.setState({
            showDeleteText: false
        })
    }

    showEditBtn(){
        this.setState({
            showEditText: true
        })
    }

    hideEditBtn(){
        this.setState({
            showEditText: false
        })
    }

    render() {
        return (
            <div className="container dashboard">
                <div className="wrapper">
                    <h1 className="text-center">Hello {this.state.user.name}!</h1>
                    <p>This is your dashboard where you can <span>manage your passwords</span></p>.
                    <p>Here is all your passwords:</p>
                    {
                        this.state.user.password !== undefined ?
                            <ol>
                                {
                                    this.state.user.password.map((pass, i) => {
                                        return (
                                            <li key={i}>
                                                {this.state.showPass ? pass : pass.replace(/./g, '*') }
                                                <button onClick={this.deletePass.bind(this, pass)}
                                                        className="delete-btn"
                                                        onMouseEnter={this.showDeleteBtn}
                                                        onMouseLeave={this.hideDeleteBtn}><i className="fa fa-times"></i></button>
                                                {this.state.showDeleteText ? <span className="modal-delete">Delete</span> : null}
                                                <button onClick={this.editPass.bind(this, pass)}
                                                        className="edit-btn"
                                                        onMouseEnter={this.showEditBtn}
                                                        onMouseLeave={this.hideEditBtn}><i className="fa fa-edit"></i>
                                                </button>
                                                {this.state.showEditText ? <span className="modal-delete">Edit</span> : null}
                                                {
                                                    this.state.showPass ?
                                                        <button onClick={this.hidePass.bind(this, pass)} className="show-hide">Hide</button>
                                                        : null
                                                }
                                                {
                                                    !this.state.showPass ?
                                                        <button onClick={this.showPass.bind(this, pass)} className="show-hide">Show</button>
                                                        : null
                                                }
                                            </li>
                                        )
                                    })
                                }
                            </ol> : null
                    }
                    {
                        this.state.valid ? null :
                            <div className="alert alert-danger text-center">
                                You can not enter an <strong>empty</strong> field.
                            </div>
                    }
                    {
                        !this.state.isPasswordExist ? null :
                            <div className="alert alert-danger text-center">
                                This password is already <strong>exist</strong>.
                            </div>
                    }
                    {
                        !this.state.isPasswordLast ? null :
                            <div className="alert alert-danger text-center">
                                You need at least <strong>1 password</strong>.
                            </div>
                    }
                    {
                        this.state.edit ?
                            <div className="input-group col-sm-3">
                                <input type="text"
                                       value={this.state.editNewPassword}
                                       onChange={this.updatePass}
                                       className="form-control"/>
                                <button onClick={this.saveUpdatedPassword} className="btn btn-primary col-sm-12 add-pass-btn">Save new password</button>
                            </div> : null
                    }
                    {
                        !this.state.editedPassExist ? null :
                            <div className="alert alert-danger text-center">
                                Your edited password <strong>is already in your password-list</strong> field.
                            </div>
                    }
                    <div className="input-group col-sm-3 add-password">
                        <input type="text"
                               value={this.state.password}
                               onChange={this.newPassValue}
                               className="form-control"
                               placeholder="New password"/>
                        <button onClick={this.addNewPass} className="btn btn-primary col-sm-12 add-pass-btn">Add password</button>
                    </div>
                </div>
            </div>
        )
    }
}