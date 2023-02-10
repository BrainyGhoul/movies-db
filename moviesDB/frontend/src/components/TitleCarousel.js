import Carousel from 'react-material-ui-carousel';
import React, { Component } from "react";
import "./titlecarousel.css";
import api from "../axios";


export default class TitleCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titles: []
        };
        this.get_data();
    }
    
    render () {
        return (
            <div className="carousel page__component">
                <h2 className="component__title">
                    {this.props.name}
                </h2>
                <Carousel className="carousel">
                    {this.state.titles.map((title, i) => <Item title={title} key={i} /> )}
                </Carousel>
            </div>
        )
    }

    get_data = () => {
        var name = ""
        if (this.props.name) {
            name = this.props.name.toLowerCase()
        }
        api.get(JSON.parse(window.localStorage.getItem("api_endpoints"))["titles"] + `?${name}=${true}`.trim("?="))
        .then(response => {
            this.setState({
                titles: response.data
            });
        });
    }
}


class Item extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="carousel__item">
                <div className="item__banner">
                    <img src={this.props.title.banner} alt={this.props.title.title + " banner"} />
                </div>
                <div className="carousel__info">
                    <div className='info_img'>
                        <img className="carousel__cover" src={this.props.title.cover} alt={this.props.title.title + " cover"} />
                    </div>
                    <div className='info_content'>
                        <p className="carousel__item-description">{this.props.title.description}</p>
                    </div>
                </div>
            </div>
        )
    }
}