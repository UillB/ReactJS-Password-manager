import React from 'react';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            session: JSON.parse(localStorage.getItem("session")) || null
        };
    }

    logOut(event) {
        event.preventDefault();
        this.setState({
            session: {auth: false, userEmail: ''}
        });
        localStorage.setItem("session", JSON.stringify({auth: false, userEmail: ''}));
        browserHistory.push('/register');
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <img src="https://facebook.github.io/react/img/logo_og.png"/>
                        </div>
                        <ul className="nav navbar-nav">
                            <li><Link to="/dashboard"><i className="fa fa-cog fa-spin"></i> Dashboard</Link></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/sign-in"><i className="fa fa-sign-in"></i> Sign In</Link></li>
                            <li><Link to="/register"><i className="fa fa-user-circle"></i> Sign up</Link></li>
                            <li><Link onClick={this.logOut.bind(this)}><i className="fa fa-arrow-circle-right"></i> Sign out</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                {this.props.children}
            </div>
        )
    }
}