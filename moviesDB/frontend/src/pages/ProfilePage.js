import React, { Component } from "react";
import TitleSlider from "../components/TitleSlider";
import api from "../axios";
import Reviews from "../components/Reviews";

export default class ProfilePage extends Component {

    constructor (props) {
        super(props);
        this.state = {
            profile: {}
        };
        this.get_profile();
    }

    render () {
        var writer = <></>;
        var actor = <></>;
        var director = <></>;
        if (this.state.profile.titles_written) {
            writer = <li>Writer</li>;
        }
        if (this.state.profile.titles_directed) {
            director = <li>Director</li>;
        }
        if (this.state.profile.titles_starred) {
            actor = <li>Actor</li>;
        }
        return (
            <div className="centered">
                <div className="page__60percent">


                    {/* this is the main profile with pictures */}
                    <div className="profile__card page__component" >
                        <div className="profile__cover">
                            <img src={this.state.profile.cover_photo} alt={this.state.profile.name + " cover_photo"} />
                            <div className="profile__photo">
                                <img src={this.state.profile.profile_photo} alt={this.state.profile.name + " profile_photo"} />
                            </div>
                        </div>
                        <div className="profile__description">
                            <h2 className="profile__name">{this.state.profile.name}</h2>
                            <p className="profile__bio">{this.state.profile.bio}</p>
                            <hr/>
                            <ul className="profile__roles">
                                {writer} {director} {actor}
                            </ul>
                        </div>
                    </div>
                    {/* sliders with all the titles related */}
                    <TitleSlider name="Directed" titles={this.state.profile.titles_directed} />
                    <TitleSlider name="Written" titles={this.state.profile.titles_written} />
                    <TitleSlider name="Acted in" titles={this.state.profile.titles_starred} />

                    <Reviews reviews={this.state.profile.review} />


                </div>
            </div>
        )
    }

    get_profile = () => {
        var username = window.location.pathname;
        if (username == "/profile") {
            username = "me";
        }
        username = username.split("/").slice(-1)[0]
        
        api.get(JSON.parse(window.localStorage.getItem("api_endpoints"))["profile"] + username)
        .then(response => {
            if (response.data.length == 1) {
                var data = response.data[0];
                data["name"] = data["first_name"] + " " + data["last_name"] 
                this.setState({
                    profile: data
                });
                console.log(data)
            }
        });
    }
}