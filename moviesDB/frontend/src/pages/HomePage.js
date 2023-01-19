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
                    <h1>
                        This is the home page
                    </h1>
                    <TitleCarousel name="Popular"/>
                    <TitleSlider name="popular" />
                </div>
            </div>
        )
    }
}