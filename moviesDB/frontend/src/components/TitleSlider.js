import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./titleslider.css";
import StarRateIcon from "@material-ui/icons/Star";
import { Button } from "@material-ui/core";

import api from "../axios";
import WatchlistIcon from "../icons/watchlist_icon";

export class TitleSliderApi extends Component {
    constructor(props) {
        super(props);
        this.state = {data: false};
        this.slider_data();
    }

    render() {
        if (this.state.data) {
            return (<TitleSlider titles={this.state.data} name={this.props.name} />);
        }
        console.log(this.state.data);
        return (<></>);
    }

    slider_data = () => {
        api.get(JSON.parse(window.localStorage.getItem("api_endpoints"))["titles"] + `?${this.props.stringQueryParameters}`.trim("?="))
        .then(response => {
            this.setState({
                data: response.data
            });
        });
    }

}

export default class TitleSlider extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.titles) {
            
            return (
                <div className="slider page__component">
                    <h1 className="component__title">{this.props.name}</h1>
                    <div className="slider__nav slider__pre"><Button  onClick={this.previous_button_press}><p>&lt;</p></Button></div>
                    <div className="slider__nav slider__next"><Button onClick={this.next_button_press} ><p>&gt;</p></Button></div>
                    <div className="slider__items">
                        {this.props.titles.map((title, i) => <SliderItem title={title} key={i} />)}
                    </div>
                </div>
            )
        } else {
            return <></>
        }
    }

    previous_button_press = (event) => {
        const parent = event.currentTarget.parentNode.parentElement.lastChild;
        parent.scrollLeft = parent.scrollLeft - parent.clientWidth;
    }

    next_button_press = (event) => {
        const parent = event.currentTarget.parentNode.parentElement.lastChild;
        parent.scrollLeft = parent.scrollLeft + parent.clientWidth;
    }
}

class SliderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title
        }
    }

    render() {
        return (
            <div className="slider__item">
                <div className="slider__photo">
                <img className="" src={this.state.title.cover} alt={this.state.title.title + " cover"}/>
                </div>
                <div className="slider__info" >
                    <div className="slider__rating">
                        <StarRateIcon color="primary" />
                        <span>
                            {this.state.title.total_rating}
                        </span>
                    </div>
                    <div className="slider__title" >
                        <Link to={`/title/${this.state.title.id}`}><p className="slider__title-text">{this.state.title.title}</p></Link>
                    </div>
                    <WatchlistIcon title_id={this.state.title.id} type="button"/>
                </div>
                <WatchlistIcon title_id={this.state.title.id} />
            </div>
        )
    }
}