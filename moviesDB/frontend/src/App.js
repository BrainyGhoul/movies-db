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
import api from "./axios";
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
        this.state = {};
        this.getEndpoints();
        // the purpose is to access the url from any page
        this.saveImageUrlInLocalStorage();
    }
    
    render() {
        return (
            <div className="App">
                
                {window.localStorage.getItem("api_endpoints")?
                
                    <Router>
                        <Navbar />
                        <div className="page">
                            { window.localStorage.getItem("access_token") ?
                                // the user can access these pages if theyre logged in
                                <Routes>
                                        <Route path="/" element={<HomePage />} />
                                        <Route path="/profile/*" element={<ProfilePage />} />
                                        <Route path="/title" element={<TitlePage />} />
                                        <Route path="/watchlists" element={<WatchlistPage />} />
                                        {/* <Route path="*" element={ <PageNotFound /> } /> */}
                                        <Route path="*" element={<Navigate to="/" replace />}/>
                                </Routes> :
                                // user can access these pages if they're not logged in
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/signup" element={<SignUpPage />} />
                                    <Route path="/signin" element={<SignInPage />} />
                                    <Route path="*" element={ <Navigate to="/" replace /> } />
                                    {/* <Route path="*" element={ <PageNotFound />} /> */}
                                </Routes>
                            }
                        </div>
                        <Footer />
                    </Router>: null
                }
                
            </div>
        )
    }
    

    saveImageUrlInLocalStorage = () => {
        if (!window.localStorage.getItem("logo_url")) {
            window.localStorage.setItem("logo_url", this.props.logo_url)
        }
    }

    // getting all the endpoints the backend api offers
    getEndpoints = () => {
        api.get("/api/endpoints/")
        .then(response => {
            response = response.data;
            console.log(response);
            Object.keys(response).forEach(key => {
                response[key] = response[key].replace(/<.*>.*/, "");
            });
            
            window.localStorage.setItem("api_endpoints", JSON.stringify(response));
        });
    }
}





const appDiv = document.getElementById("main");
render(<App  logo_url={document.currentScript.getAttribute('logo')}/>, appDiv);
