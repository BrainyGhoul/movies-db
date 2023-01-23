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
    Divider,
    TextField
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import api from "../axios";
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
                        <Link to="/">
                            <img className="navbar__logo" src={window.localStorage.getItem("logo_url")} alt="logo" />
                        </Link>
                    </div>
                    <TextField hiddenLabel fullwidth="true" label="Search" className="navbar__search" variant="filled" size="small" />

                        
                        <div className="navbar__control">

                            <DrawerComponent className="drawer" signout_function={this.signout}/> 
                            <div className="navbar__links-wrapper">
                                <Link to="/" className="navbar__link" >
                                    Home
                                </Link>
                                { window.localStorage.getItem("access_token") ?
                                    <>
                                    <Link to="/watchlists" className="navbar__link" >
                                        Watchlists
                                    </Link>
                                    <div className="navbar__sign-buttons">
                                        <Button variant="text" onClick={this.signout} className="navbar__button">
                                            Sign Out
                                        </Button>
                                    </div>
                                    </>:


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
                            </div>
                        </div>
                </Toolbar>
            </AppBar>
        )
    }

    signout = () => {
        window.localStorage.removeItem("refresh_token");
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
                                <Link to="/watchlists">watchlists</Link>
                            </ListItemText>
                        </ListItem>
                    </List>
                    <div className="drawer__sign">
                    { window.localStorage.getItem("access_token") ?
                        <>
                            <List>
                                <Divider />
                                <ListItem className="drawer__sign--center">
                                    <ListItemText>
                                        <Button onClick={this.props.signout_function} className="navbar__button navbar__button--center" variant="outlined">
                                            Logout
                                        </Button>
                                    </ListItemText>
                                </ListItem>
                            </List>
                        </>:
                        <>
                            <List>
                                <Divider />
                                <ListItem className="drawer__sign--center">
                                    <ListItemText>
                                        <Link to="/signin">
                                            <Button className="navbar__button navbar__button--center" variant="outlined">
                                                Login
                                            </Button>
                                        </Link>
                                    </ListItemText>
                                </ListItem>
                            </List>
                            <List>
                                <Divider />
                                <ListItem className="drawer__sign--center">
                                    <ListItemText>
                                        <Link to="/signup">
                                            <Button className="navbar__button navbar__button--center" variant="outlined">
                                                Sign Up
                                            </Button>
                                        </Link>
                                    </ListItemText>
                                </ListItem>
                            </List>
                        </>
                    }
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