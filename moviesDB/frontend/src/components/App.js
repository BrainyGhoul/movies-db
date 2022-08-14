// App is the parent component which governs the distribution of pages
// The page components are loaded from here



import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import TitlePage from "./TitlePage";
import WatchlistPage from "./WatchlistPage";
import RegisterPage from "./RegisterPage";
import LoginPage from "./login";
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
    }

    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/title" element={<TitlePage />} />
                    <Route path="/watchlist" element={<WatchlistPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </Router>
        )
    }
}


const appDiv = document.getElementById("app");
render(<App />, appDiv);