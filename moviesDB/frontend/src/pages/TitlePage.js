import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../axios";
import UserGrid from "../components/UserGrid";
import Reviews from "../components/Reviews";
import Rating from '@mui/material/Rating';



export default function TitlePage(props) {
    
    const { id } = useParams();
    const [title, setTitle] = useState({});
    const [rating, setRating] = useState(0);


    useEffect(() => {
        api.get(JSON.parse(window.localStorage.getItem("api_endpoints"))["title"] + id)
        .then(response => {
            setTitle(response.data[0]);
        });
        api.get(JSON.parse(window.localStorage.getItem("api_endpoints"))["rating"] + id)
        .then(response => {
            if (response.data.rating)
                setRating(response.data.rating)
        });
    }, [])

    const change_rating = (event, newValue) => {
        setRating(newValue);
        console.log(newValue);
        api.post(JSON.parse(window.localStorage.getItem("api_endpoints"))["rating"] + id, {"rating": newValue});
    }


    if (title.title) {

        return (
            <div className="titlePage">


                <div className="titlePage__banner page__component" style={{ backgroundImage: `url(${title.banner})`}}>
                    <img className="titlePage__banner--transparent" src={title.banner} />
                </div>


                <div className="titlePage__intro page__component page__component--padded">
                    <div className="titlePage__cover-container">
                        <img className="titlePage__cover" src={title.cover} />
                    </div>
                    <div className="titlePage__info">
                        <h1 className="titlePage__title">{title.title}</h1>
                        <div className="titlePage__info--gray">{[title.titleType, title.release_date, title.length].join(" · ")}</div>
                        <p className="titlePage__description">{title.description}</p>
                        <div className="titlePage__tags">
                            <h4>Tags:</h4>
                            {title.tags.map((tag, i) =>{
                                return <span className="titlePage__tag" key={i}>{tag.name}</span>
                            })}
                        </div>
                    </div>
                    <div className="titlePage__rate">
                        <h4>Movies Db Rating: {title.total_rating}</h4>
                        <h4>Your Rating:</h4>
                        <Rating
                            name="title-rating"
                            value={rating}
                            onChange={change_rating}
                        />
                    </div>
                </div>

                <div className="titlePage__trailer page__component"></div>
                <div className="titlePage__users page__component">
                    <UserGrid users={{"directors": title.directors, "writers": title.writers, "stars": title.stars}}/>
                </div>
                <div className="page__component page__60percent page__component--500px">
                    <Reviews reviews={title.review} />
                </div>
            </div>
        )
    } 
    return <></>



}
