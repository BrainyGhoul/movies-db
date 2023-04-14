import React, { Component } from "react";
import {
    Link
} from "react-router-dom";
import {
    TextField,
    Button
} from "@material-ui/core";
import "bootstrap";
import api from "../axios";

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
        api.post(JSON.parse(window.localStorage.getItem("api_endpoints"))["signin"], this.state.formData)
        .then(response => {
            response = response.data;
            if (response["access"]) {

                window.localStorage.setItem("access_token", response["access"]);
                window.localStorage.setItem("refresh_token", response["refresh"]);
            } else {
                // TODO
            }
            // reloading to go to the homepage
            window.location.reload();
        }).catch(error => {
            console.log(error);
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
                <div className="centered centered--vertical">

                    <img className="sign__logo" src={window.localStorage.getItem("logo_url")} alt="logo" />
                    <div className="sign__form-container">
                        <form className="sign__form" onSubmit={this.getAccessToken} method="post">

                            {/* <input type="hidden" name="csrfmiddlewaretoken" value={this.state.csrf_token} /> */}

                            <TextField autoFocus margin="dense" variant="outlined" size="small" type="text" onChange={this.updateState} name="username" label="Username" />
                            <TextField margin="dense" variant="outlined" size="small" type="password" onChange={this.updateState} name="password" label="password" />
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