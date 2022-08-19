// App is the parent component which governs the distribution of pages
// The page components are loaded from here



import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import TitlePage from "./TitlePage";
import WatchlistPage from "./WatchlistPage";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect,
} from "react-router-dom";


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_info: this.user_info
        }
        this.user_info();
    }
    
    render() {
        // getting the user info before the component is rendered

        return (
            <Router>
                { this.state.user_info.is_authenticated ?
                    // the user can access these pages if theyre logged in
                    <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/title" element={<TitlePage />} />
                            <Route path="/watchlist" element={<WatchlistPage />} />
                    </Routes> :
                    // user can access these pages if theyre no logged in
                    <Routes>
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />
                    </Routes>
                }
            </Router>
        )
    }

    // TODO
    // getting the infomation about the user to start off with
    user_info = () => {

        fetch("/api/user-info")
        .then(response => response.json())
        .then(result => {

            this.setState({
                user_info: result
            })
        });
    
    }
    
}


const appDiv = document.getElementById("app");
render(<App />, appDiv);