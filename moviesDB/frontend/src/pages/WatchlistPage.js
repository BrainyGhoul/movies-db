import React, { Component } from "react";
import TitleCard from "../components/TitleCard";
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
        } else if (this.state.watchlists) {
            console.log(this.state.watchlists)
            return (
                <div className="watchlistPage">
                    {
                        this.state.watchlists?.map((watchlist, item) => {
                            return (<div className="watchlistPage__watchlist page__component" key={item}>
                                <h1 className="watchlistPage__title">{watchlist.name}</h1>
                                <div className="watchlistPage__gridWrapper">
                                    <div className="watchlistPage__grid">
                                        {
                                            watchlist.titles.map((title, title_item) => {
                                                return <TitleCard title={title} key={title_item} />;
                                            })
                                        }
                                    </div>
                                </div>
                            </div>);
                        })
                    }
                </div>
            )

        } else {
            return <></>
        }
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
                    watchlists: response.data.filter(n => n.titles.length)
                });
            }
        });
    }
}