import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./usergrid.css";

function UserGrid(props) {
    const [personType, setPersonType] = useState('directors');
    const data = props.users;

    const handleChange = (event) => {
        setPersonType(event.target.value);
    };

    if (data) {

        return (
            <div className="slider-container page__component page__component--padded">
            <div className="slider-dropdown-wrapper">
                <select className="slider__dropdown" onChange={handleChange}>
                    {Object.keys(data).map((type, index) => (
                        <option value={type} key={index}>{type}</option>
                    ))}
                </select>
            </div>
            <div className="slider-wrapper">
                {data[personType].map((person, index) => (
                <div className="slider-item" key={index}>
                    <div className="slider-item__image">
                        <img src={person.profile_photo} alt={person.name} />
                    </div>
                    <Link className="silder-item__name--simple" to={`/profile/${person.username}`}><div className="slider-item__name">{person.name}</div></Link>
                </div>
                ))}
            </div>
            </div>
        );
    } else {
        return <></>
    }
}

export default UserGrid;