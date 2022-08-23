// App is the parent component which governs the distribution of pages
// The page components are loaded from here



import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import TitlePage from "./pages/TitlePage";
import WatchlistPage from "./pages/WatchlistPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
import { CTA, Feature, Navbar } from "./components";
import { Features, Footer, Header, Possibility } from "./containers";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_info: this.user_info
        }
        this.user_info();
    }
    
    render() {


        return (
            <div className="App">
                <div className="gardient__bg">
                    <Navbar />
                    <Header />
                </div>
                {/*  getting the user info before the component is rendered */}
                <Router>
                    { this.state.user_info.is_authenticated ?
                        // the user can access these pages if theyre logged in
                        <Routes>
                                <Route path="/profile" element={<ProfilePage />} />
                                <Route path="/" element={<HomePage />} />
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
                <Features />
                <Possibility />
                <CTA />
                <Footer />

            </div>
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