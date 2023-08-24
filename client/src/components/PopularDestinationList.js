import React, { useEffect, useState } from "react";
import PopularDestinationTile from "./PopularDestinationTile";
import GetDestination from "../services/GetDestination";

const PopularDestinationList = (props) => {
    const [popularDestinations, setPopularDestinations] = useState([]);

    useEffect(() => {
        GetDestination.getDestinations().then((destinations) => {
            setPopularDestinations(destinations);
        });
    }, []);

    const listDestinations = popularDestinations.map((destination) => {
        return (
            <PopularDestinationTile
                key={destination.name}
                name={destination.name}
                photo={destination.url}
            />
        );
    });
    return (
        <div className="container-dest">
            <h1 className="page-title">Popular destinations</h1>
            <div className="slider">
                <div className="slide-track">{listDestinations}</div>
            </div>
        </div>
    );
};

export default PopularDestinationList;
