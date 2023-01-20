import React, { Component } from "react";
import "./titleslider.css";
import StarRateIcon from "@material-ui/icons/Star";
import { Button } from "@material-ui/core";
import BookmarkAdd from "@material-ui/icons/Bookmark";

export default class TitleSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titles: []
        };
        this.get_data();
    }

    render() {
        return (
            <div className="slider">
                <h1 className="component__title">{this.props.name}</h1>
                <div className="slider__nav slider__pre"><Button  onClick={this.previous_button_press}><p>&lt;</p></Button></div>
                <div className="slider__nav slider__next"><Button onClick={this.next_button_press} ><p>&gt;</p></Button></div>
                <div className="slider__items">
                    {this.state.titles.map((title, i) => <SliderItem title={title} key={i} />)}
                </div>
            </div>
        )
    }

    previous_button_press = (event) => {
        const parent = event.currentTarget.parentNode.parentElement.lastChild;
        parent.scrollLeft = parent.scrollLeft - parent.clientWidth;
    }

    next_button_press = (event) => {
        const parent = event.currentTarget.parentNode.parentElement.lastChild;
        parent.scrollLeft = parent.scrollLeft + parent.clientWidth;
    }
    
    get_data = () => {
        var name = ""
        if (this.props.name) {
            name = this.props.name.toLowerCase();
        }
        fetch(JSON.parse(window.localStorage.getItem("api_endpoints"))["titles"] + `?${this.props.stringQueryParameters}`.trim("?="))
        .then(response => response.json())
        .then(response => {
            this.setState({
                titles: response
            });
        });
    }
}

class SliderItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="slider__item">
                <div className="slider__photo">
                <img className="" src={this.props.title.cover} alt={this.props.title.title + " cover"}/>
                </div>
                <div className="slider__info" >
                    <div className="slider__rating">
                        <StarRateIcon />
                        <span>
                        {this.props.title.rating}
                        </span>
                    </div>
                    <div className="slider__title" >
                        <a href="#TODO">{this.props.title.title}</a>
                    </div>
                    <div className="slider__watchlist-button">
                        <Button onClick="#TODO">WatchList</Button>
                    </div>
                </div>
                <div >
                    <BookmarkAdd  className="slider__bookmark-flag"/>
                </div>
            </div>
        )
    }
}