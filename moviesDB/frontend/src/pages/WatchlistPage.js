import React, { Component } from "react";
import TitleSlider from "../components/TitleSlider";
import api from "../axios";


export default class WatchlistPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            watchlists: []
        }
        this.get_watchlists();
    }

    render () {
        return (
            <div>
                <h1>This is the Watchlist Page</h1>
                { this.state.watchlists.map((watchlist, i) => <TitleSlider titles={watchlist.titles} key={i} name={watchlist.name} />) }
            </div>
        )
    }

    get_watchlists = () => {
        api.get(JSON.parse(window.localStorage.getItem("api_endpoints"))["watchlists"])
        .then(response => {
            this.setState({
                watchlists: response.data
            });
        });
    }
}