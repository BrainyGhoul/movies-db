// App is the parent component which governs the distribution of pages
// The page components are loaded from here

import React, { Component } from "react";
import { render } from "react-dom";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect,
    Navigate
} from "react-router-dom";
import "./app.css";


import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import TitlePage from "./pages/TitlePage";
import WatchlistPage from "./pages/WatchlistPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; 



export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api_headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        this.getEndpoints();
        // the purpose is to access the url from any page
        this.saveImageUrlInLocalStorage();
    }
    
    render() {
        return (
            <div className="App">
                <Router>
                    <Navbar />
                    { window.localStorage.getItem("authorization_token") ?
                        // the user can access these pages if theyre logged in
                        <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/profile" element={<ProfilePage />} />
                                <Route path="/title" element={<TitlePage />} />
                                <Route path="/watchlist" element={<WatchlistPage />} />
                                {/* <Route path="*" element={ <PageNotFound /> } /> */}
                                <Route path="*" element={<Navigate to="/" replace />}/>
                        </Routes> :
                        // user can access these pages if they're no logged in
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/signup" element={<SignUpPage getState={this.getState} />} />
                            <Route path="/signin" element={<SignInPage getState={this.getState} />} />
                            <Route path="*" element={ <Navigate to="/" replace /> } />
                            {/* <Route path="*" element={ <PageNotFound />} /> */}
                        </Routes>
                    }
                    <Footer />
                </Router>

            </div>
        )
    }
    

    saveImageUrlInLocalStorage = () => {
        if (!window.localStorage.getItem("logo_url")) {
            window.localStorage.setItem("logo_url", this.props.logo_url)
        }
    }

    // reduces redundency. You can just get the endpoints from here and other important stuff as well
    getState = () => {
        return this.state
    }

    // getting all the endpoints the backend api offers
    getEndpoints = () => {
        fetch("/api/endpoints/")
        .then(response => response.json())
        .then(response => {
            this.setState({
                api_endpoints: response
            });
        });
    }
}





const appDiv = document.getElementById("main");
render(<App  logo_url={document.currentScript.getAttribute('logo')}/>, appDiv);