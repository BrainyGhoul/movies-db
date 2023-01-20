import React, { Component } from "react";
import TitleCarousel from "../components/TitleCarousel";
import TitleSlider from "../components/TitleSlider";


export default class HomePage extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="centered">
                <div className="home">
                    <TitleCarousel name="Popular" stringQueryParameters="popular=true"/>
                    <TitleSlider name="Popular" stringQueryParameters="popular=true" />
                    <TitleSlider name="Upcoming" stringQueryParameters="upcoming=true" />
                    <TitleSlider name="TV Shows" stringQueryParameters="titleType=TV" />
                </div>
            </div>
        )
    }
}