import React, { Component } from "react";
import "./reviews.css";



export default class Reviews extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        if (this.props.reviews) {
            return (
                <>
                    <h1 className="reviews__title component__title">Reviews</h1>
                    <div className="reviews">
                        {this.props.reviews.map((review, i) => <Review key={i} data={review} />)}
        
                    </div>
                </>
            )
        } else {
            return <></>
        }
    }
}

class Review extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="review">
                <div className="review__card">
                    <div className="review__intro">
                        {/* <span className="review__title">{this.props.data.title}</span> */}
                        <a href={JSON.parse(window.localStorage.getItem("api_endpoints"))["profile"] + this.props.data.author}>{this.props.data.author}</a>
                        <span className="review__dot">&middot;</span>
                        <span className="review__date">{this.props.data.posted_on.split("T")[0]}</span>
                        <div></div>
                    </div>
                    <div className="review__data">
                        <h2>{this.props.data.title}</h2>
                        <p className="review__text">{this.props.data.text}</p>
                    </div>
                </div>
                <hr />
            </div>
        )
    }
}