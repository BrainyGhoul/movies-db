import React, { Component } from "react";
import {
    Link
} from "react-router-dom";


export default class SignUpPage extends Component {

    constructor (props) {
        super(props);
    }

    render() {
        return (
            <div className="sign">
                {/* centered div  */}
                <div className="centered">

                    <img className="sign__logo" src={window.localStorage.getItem("logo_url")} alt="logo" />
                    <div className="sign__form-container">
                        <form className="sign__form" onSubmit="#TODO" method="post">

                            <div className="form-group">
                                <input autoFocus className="form-control sign__input" type="text"  name="fullname" placeholder="Full Name" />
                            </div>
                            <div className="form-group">
                                <input className="sign__input form-control" type="text"  name="email" placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <input className="sign__input form-control" type="password"  name="password" placeholder="Password" />
                            </div>
                            
                            <div className="form-group">
                                <input className="form-control btn btn-primary" type="submit" value="SignUp" />
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
}