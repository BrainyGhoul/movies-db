import React, { Component } from "react";
import TitleCarousel from "../components/TitleCarousel";
import { TitleSliderApi } from "../components/TitleSlider";


export default class HomePage extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="centered">
                <div className="page__60percent">
                    <TitleCarousel name="Popular" stringQueryParameters="popular=true"/>
                    <TitleSliderApi name="Popular" stringQueryParameters="popular=true" />
                    <TitleSliderApi name="Upcoming" stringQueryParameters="upcoming=true" />
                    <TitleSliderApi name="TV Shows" stringQueryParameters="titleType=TV" />
                </div>
            </div>
        )
    }
}