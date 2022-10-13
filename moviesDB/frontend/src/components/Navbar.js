import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Button,
    Divider
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import "./navbar.css";


export default class Navbar extends Component {

    constructor (props) {
        super(props);
    }

    render() {
        return (
            <AppBar position="static" className="navbar--left navbar">
                <CssBaseline />
                <Toolbar>
                    <div className="navbar__logo-wrapper">
                        <img className="navbar__logo" src={window.localStorage.getItem("logo_url")} alt="logo" />
                    </div>

                        
                        { window.localStorage.getItem("authorization_token") ?
                            <div className="navbar__control">
                                <DrawerComponent className="drawer" signout_function={this.signout}/> 
                                <div className="navbar__links-wrapper">
                                    
                                    <Link to="/" className="navbar__link" >
                                        home
                                    </Link>
                                    <Link to="/watchlist" className="navbar__link" >
                                        Watchlist
                                    </Link>
                                    <div className="navbar__sign-buttons">
                                        <Button variant="text" onClick={this.signout} className="navbar__button">
                                            Sign Out
                                        </Button>
                                    </div> 
                                </div>
                            </div>:

                            <div className="navbar__sign-buttons">
                                <Link to="/signin" className="navbar__link--simple">
                                    <Button variant="outlined" className="navbar__button">
                                            Sign In
                                    </Button>
                                </Link>
                                <Link to="/signup" className="navbar__link--simple">
                                    <Button variant="contained" className="navbar__button">
                                            Sign Up
                                    </Button>
                                </Link>
                            </div>
                        }
                </Toolbar>
            </AppBar>
        )
    }

    signout = () => {
        window.localStorage.removeItem("authorization_token");
        window.localStorage.removeItem("access_token");
        location.reload();
    }
}


class DrawerComponent extends Component {
    constructor (props) {
        super(props);
        this.state = {
            openDrawer: false
        }
    }

    // componentDidUpdate () {

    //     document.body.addEventListener("click", (event) => {
    //         this.setState({
    //             openDrawer: false
    //         })
    //     })
    // }

    render () {
        return (
            <div className={this.props.className}>
                <Drawer 
                    open={this.state.openDrawer} 
                    anchor="right"
                    onClose={ (ev, reason) => this.setState({ openDrawer: false }) }
                    classes={{
                        paper: "drawer__paper"
                    }}>
                    <List>
                        <ListItem onClick={this.close_drawer}>
                            <ListItemText>
                                <Link to="/">Home</Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem onClick={this.close_drawer}>
                            <ListItemText>
                                <Link to="/watchlist">watchlist</Link>
                            </ListItemText>
                        </ListItem>
                    </List>
                    <div className="drawer__logout">
                        <List>
                            <Divider />
                            <ListItem className="drawer__logout--center">
                                <ListItemText>
                                    <Button onClick={this.props.signout_function} className="navbar__button navbar__button--center" variant="outlined">
                                        Logout
                                    </Button>
                                </ListItemText>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
                <IconButton onClick={this.toggle_drawer}>
                    <MenuIcon />
                </IconButton>
            </div>
        )
    }
    toggle_drawer = () => {
        this.setState({
            openDrawer: !this.state.openDrawer
        });
    }
    close_drawer = () => {
        this.setState({
            openDrawer: false
        });
    }
}