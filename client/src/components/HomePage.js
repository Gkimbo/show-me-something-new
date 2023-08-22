import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getBackgroundPhoto from "../services/getBackgroundPhoto";
import ActivitiesList from "./ActivitiesList";
import PopularDestinationList from "./PopularDestinationList";

const HomePage = (props) => {
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        getBackgroundPhoto().then((response) => {
            setImageUrl(response);
        });
    }, []);

    return (
        <div className="grid-x home-page-div">
            <div className="cell small-12">
                <div className="container-button">
                    <style>{`.container-button{background-image: url(${imageUrl})}`}</style>
                    <Link to="/my-activities" className="button-1">
                        Click Me for things to do!
                    </Link>
                </div>
            </div>
            <div className="cell small-12 medium-12 large-6">
                <PopularDestinationList />
            </div>
            <div className="cell medium-12 large-6">
                <div className="container-2">
                    <h1 className="page-title cell small-12">Activity List</h1>
                    <ActivitiesList />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
