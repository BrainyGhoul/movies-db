import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./titlecard.css";
import StarRateIcon from "@material-ui/icons/Star";
import WatchlistIcon from "../icons/watchlist_icon";

class TitleCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card__photo">
                <img className="" src={this.state.title.cover} alt={this.state.title.title + " cover"}/>
                </div>
                <div className="card__info" >
                    <div className="card__rating">
                        <StarRateIcon color="primary" />
                        <span>
                            {this.state.title.total_rating}
                        </span>
                    </div>
                    <div className="card__title" >
                        <Link to={`/title/${this.state.title.id}`}><p className="card__title-text">{this.state.title.title}</p></Link>
                    </div>
                    {   
                        window.localStorage.getItem("access_token")?
                        <WatchlistIcon title_id={this.state.title.id} type="button"/>:<></>
                    }
                </div>
                <WatchlistIcon title_id={this.state.title.id} />
            </div>
        )
    }
}

export default TitleCard;