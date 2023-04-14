import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./titleslider.css";
import { Button } from "@material-ui/core";
import TitleCard from "./TitleCard";
import api from "../axios";

export class TitleSliderApi extends Component {
    constructor(props) {
        super(props);
        this.state = {data: false};
        this.slider_data();
    }

    render() {
        console.log(this.state);
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
        console.log(this.props)
    }

    render() {
        if (this.props.titles.length) {
            return (
                <div className="slider page__component">
                    <h1 className="component__title">{this.props.name}</h1>
                    <div className="slider__nav slider__pre"><Button  onClick={this.previous_button_press}><p>&lt;</p></Button></div>
                    <div className="slider__nav slider__next"><Button onClick={this.next_button_press} ><p>&gt;</p></Button></div>
                    <div className="slider__items">
                        {this.props.titles.map((title, i) => <TitleCard title={title} key={i} />)}
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