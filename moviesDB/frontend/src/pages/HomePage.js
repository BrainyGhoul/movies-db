import React, { Component } from "react";
import TitleCarousel from "../components/TitleCarousel";
import Carousel from "../components/TitleCarousel";


export default class HomePage extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="home">
                <h1>
                    This is the home page
                </h1>
                <TitleCarousel  />
            </div>
        )
    }

    fetch("/api/")
}