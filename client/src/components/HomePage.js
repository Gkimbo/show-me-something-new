import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getBackgroundPhoto from "../services/getBackgroundPhoto";
import ActivitiesList from "./listComponents/ActivitiesList";
import PopularDestinationList from "./listComponents/PopularDestinationList";

const HomePage = (props) => {
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        getBackgroundPhoto().then((response) => {
            setImageUrl(response);
        });
    }, []);

    return (
        <div className="grid-x home-page-div">
            <h1 className="home-title">Explore your surroundings</h1>
            <div className="cell small-12">
                <div className="container-button">
                    <style>{`.container-button{background-image: url(${imageUrl})}`}</style>
                    <Link to="/my-activities" className="button-1">
                        Click Me for things to do!
                    </Link>
                </div>
            </div>
            <div className="cell small-12">
                <PopularDestinationList />
            </div>
            <div className="cell small-12">
                <div className="container-2">
                    <h1 className="page-title cell small-12">Activity List</h1>
                    <ActivitiesList />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
