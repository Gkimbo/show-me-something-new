import React from "react";
import { Link } from "react-router-dom";
import ActivitiesList from "./ActivitiesList";
import PopularDestinationList from "./PopularDestinationList";

const HomePage = (props) => {
    return (
        <div className="grid-x home-page-div">
            <div className="cell small-12">
                <div className="container-button">
                    <Link to="/myActivities" className="button-1">
                        Click Me for things to do!
                    </Link>
                </div>
            </div>
            <div className="cell small-12 medium-12 large-6">
                <PopularDestinationList />
            </div>
            <div className="cell medium-12 large-6">
                <div className="container-2">
                    <h1 className="activity-title cell small-12">Activity List</h1>
                    <ActivitiesList />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
