import React, { Component } from "react";
import "./titleslider.css";
import StarRateIcon from "@material-ui/icons/Star";
import { Button } from "@material-ui/core";
import BookmarkAdd from "@material-ui/icons/Bookmark";
import api from "../axios";

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
        this.state = {
            titles: this.props.titles
        };
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
                        <StarRateIcon />
                        <span>
                        {this.state.title.rating}
                        </span>
                    </div>
                    <div className="slider__title" >
                        <a href="#TODO">{this.state.title.title}</a>
                    </div>
                    { window.localStorage.getItem("access_token") ?
                    <div className="slider__watchlist-button">
                        <Button onClick="#TODO">WatchList</Button>
                    </div>:<></>
                    }
                </div>
                { window.localStorage.getItem("access_token") ?
                <BookmarkAdd  className="slider__bookmark-flag"/>:
                <></>
                }
            </div>
        )
    }

    // watchlist = (event) => {
    //     var title = this.state.title;
    //     title[""]
    //     this.setState({
    //         title: 
    //     })
    // }
}