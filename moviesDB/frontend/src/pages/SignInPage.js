import React, { Component } from "react";
import {
    Link
} from "react-router-dom";
import {
    TextField,
    Button
} from "@material-ui/core";
import "bootstrap";

export default class SignInPage extends Component {

    constructor (props) {
        super(props);
        this.state = {
            formData: {}
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
        // authenticating user
        fetch(JSON.parse(window.localStorage.getItem("api_endpoints"))["signin"], {
            method: 'POST',
            
            headers : JSON.parse(window.localStorage.getItem("api_headers")),
            
            body: JSON.stringify(this.state.formData)
        }).then(response => response.json())
        .then(response_json => {
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
        var formData = this.state.formData;
        formData[event.target.name] = event.target.value;
        this.setState({
            formData
        });
    }

    
    render() {
        return (
            <div className="sign">
                {/* centered div  */}
                <div className="centered centered--vertial">

                    <img className="sign__logo" src={window.localStorage.getItem("logo_url")} alt="logo" />
                    <div className="sign__form-container">
                        <form className="sign__form" onSubmit={this.getAccessToken} method="post">

                            {/* <input type="hidden" name="csrfmiddlewaretoken" value={this.state.csrf_token} /> */}

                            <TextField autoFocus margin="dense" variant="outlined" size="small" type="text" onChange={this.updateState} name="username" label="Username" />
                            <TextField autoFocus margin="dense" variant="outlined" size="small" type="password" onChange={this.updateState} name="password" label="password" />
                            <a className="sign__text" href="#">Forgot Password?</a>
                            
                            <Button variant="contained" type="submit">Submit</Button>
                        </form>
                    </div>

                    <div className="sign__text">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
            </div>
        )
    }


}