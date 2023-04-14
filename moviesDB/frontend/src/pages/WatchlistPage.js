import React, { Component } from "react";
import TitleSlider from "../components/TitleSlider";
import api from "../axios";


export default class WatchlistPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            watchlists: [],
            no_watchlists: false
        }
        this.get_watchlists();
    }

    render () {
        if (this.state.no_watchlists) {
            return (
                <div className="centered centered--vertical">
                    <h1>No Watchlists</h1>
                </div>
            )
        }
        return (
            <div>
                { this.state.watchlists.map((watchlist, i) => <TitleSlider titles={watchlist.titles} key={i} name={watchlist.name} />) }
            </div>
        )
    }

    get_watchlists = () => {
        api.get(JSON.parse(window.localStorage.getItem("api_endpoints"))["watchlists"] + "get")
        .then(response => {
            if (response.data.length === 0) {
                this.setState({
                    no_watchlists: true
                })
            } else {
                this.setState({
                    watchlists: response.data
                });
            }
        });
    }
}