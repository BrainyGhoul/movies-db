import React, { Component } from "react";
import {
    Link,
    withRouter
} from "react-router-dom";
import {
    TextField,
    Button,
    Checkbox,
    FormControlLabel
} from "@material-ui/core";


export default class SignUpPage extends Component {

    constructor (props) {
        super(props);
        this.state = {
            formData: {}
        }
    }

    render() {
        return (
            <div className="sign signup">
                {/* centered div  */}
                <div className="centered">

                    <img className="sign__logo" src={window.localStorage.getItem("logo_url")} alt="logo" />
                    <div className="sign__form-container">
                        <form className="sign__form" onSubmit={this.createAccount} method="post">
                            <div className="sign__field-group">
                                <TextField autoFocus margin="dense" variant="outlined" size="small" type="text" onChange={this.updateState} name="first_name" label="First Name" />
                                <TextField margin="dense" variant="outlined" size="small" type="text" onChange={this.updateState} name="last_name" label="Last Name" />
                            </div>
                            <TextField margin="dense" variant="outlined" size="small" type="text" onChange={this.updateState} name="username" label="Username" />
                            <TextField margin="dense" variant="outlined" size="small" type="text" onChange={this.updateState} name="email" label="Email" />
                            <TextField margin="dense" variant="outlined" size="small" type="password" onChange={this.updateState} name="password" label="Password" />
                            <TextField margin="dense" variant="outlined" size="small" type="password" onChange={this.updateState} name="password2" label="Confirm Password" />
                            <div className="sign__field-group">
                                <Button variant="contained" type="submit">Submit</Button>
                            </div>
                        </form>

                    </div>

                    <div className="sign__text">
                        Already have an account? <Link to="/signin">Sign In</Link>
                    </div>
                </div>
            </div>
        )
    }

    updateState = (event) => {
        var formData = this.state.formData;
        formData[event.target.name] = event.target.value;
        this.setState({
            formData
        });
    }

    createAccount = (event) => {
        event.preventDefault();
        const app_state = this.props.getState();
        fetch(app_state["api_endpoints"]["signup"], {
            method: "POST",
            headers: app_state.api_headers,
            body: JSON.stringify(this.state.formData)
        }).then(response => response.json())
        .then(response_json => {
            if (response_json["message"]) {
                window.location.assign("/signin");
            } else {
                // TODO
            }
        });
    }
}