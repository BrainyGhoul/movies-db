import React, { Component } from "react";
import {
    Grid,
    Container,
    Box
} from "@material-ui/core";
import {
    Link
} from "react-router-dom";
import "./footer.css";


export default class Footer extends Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <footer className="footer">
                <Box
                    px={{ xs: 3, sm: 10 }}
                    py={{ sx: 5, sm: 10 }} 
                    bgcolor="text.secondary"
                    className="footer__box"
                >
                    <Container className="footer__container">
                        <Grid container spacing={5} className="footer__grid">
                            <Grid item xs={12} sm={4}>
                                <Box className="footer__heading">
                                    Help
                                </Box>
                                <Box>
                                    <Link to="/">
                                        Contact
                                    </Link>
                                </Box>
                                <Box>
                                    <Link to="/">
                                        Support
                                    </Link>
                                </Box>
                                <Box>
                                    <Link to="/">
                                        Privacy
                                    </Link>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Box className="footer__heading">
                                    Account
                                </Box>
                                <Box>
                                    <Link to="/signin">
                                        Sign In
                                    </Link>
                                </Box>
                                <Box>
                                    <Link to="/signup">
                                        Sign Up
                                    </Link>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Box className="footer__heading">
                                    Main
                                </Box>
                                <Box>
                                    <Link to="/profile">
                                        Profile
                                    </Link>
                                </Box>
                                <Box>
                                    <Link to="/watchlist">
                                        watchlist
                                    </Link>
                                </Box>
                                <Box>
                                    <Link to="/">
                                        Liked
                                    </Link>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </footer>
        )
    }
}