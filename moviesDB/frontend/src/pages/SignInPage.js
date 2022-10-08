import React, { Component } from "react";
import "bootstrap";

export default class SignInPage extends Component {

    constructor (props) {
        super(props);
        this.state = {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

    }

    // don't need this function currently
    // getCsrfToken = () => {
    //     fetch("/api/csrf-token")
    //     .then(response => response.json())
    //     .then(response_json => {
    //         this.setState({
    //             "csrf_token":  response_json.token,
    //             "signin_url":  response_json.signin_url
    //         });
    //     });
    // }
    
    // getEndpoints = () => {
    //     this.props.getEndpoints()
    //     .then(response => {
    //         this.setState({
    //             api_endpoints: response
    //         });
    //     });
    // }

    getAccessToken = (event) => {
        event.preventDefault();
        const app_state = this.props.getState();
        // authenticating user
        fetch(app_state["api_endpoints"]["signin"], {
            method: 'POST',
            
            headers : this.state.headers,
            
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }).then(response => response.json())
        .then(response_json => {
            console.log(response_json);
            if (response_json["access"]) {
                // uploading to localstorage
                window.localStorage.setItem("authorization_token", "Bearer " + response_json["access"]);
                window.localStorage.setItem("refresh_token", response_json["refresh"]);
            } else {
                // TODO
            }
            // reloading to go to the homepage
            window.location.reload();
        });
    }

    // used for username and password to be easily accessed for sending requests
    updateState = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    
    render() {
        return (
            <div className="sign">
                {/* centered div  */}
                <div className="centered">

                    <img className="sign__logo" src={window.localStorage.getItem("logo_url")} alt="logo" />
                    <div className="sign__form-container">
                        <form className="sign__form" onSubmit={this.getAccessToken} method="post">

                            {/* <input type="hidden" name="csrfmiddlewaretoken" value={this.state.csrf_token} /> */}

                            <div className="form-group">
                                <input autoFocus className="form-control sign__input" type="text" onChange={this.updateState} value={this.state.username} name="username" placeholder="Username" />
                            </div>

                            <div className="form-group">
                                <input className="sign__input form-control" type="password" onChange={this.updateState} value={this.state.password} name="password" placeholder="Password" />
                                <a className="sign__text" href="#">Forgot Password?</a>
                            </div>
                            
                            <div className="form-group">
                                <input className="form-control btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                    </div>

                    <div className="sign__text">
                        Don't have an account? <a href="#">Sign Up</a>
                    </div>
                </div>
            </div>
        )
    }


}