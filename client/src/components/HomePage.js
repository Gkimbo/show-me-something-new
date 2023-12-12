import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getBackgroundPhoto from "../services/getBackgroundPhoto";
import ActivitiesList from "./listComponents/ActivitiesList";
import PopularDestinationList from "./listComponents/PopularDestinationList";
import image1 from "../services/photos/fabian-quintero-UWQP2mh5YJI-unsplash.jpg";
import image2 from "../services/photos/activities.jpg";
import { Parallax } from "react-parallax";

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
                <Parallax
                    className="image-main"
                    bgImage={image1}
                    bgImageAlt="landscape"
                    strength={800}
                >
                    <div className="content">
                        <Link to="/my-activities" className="button-1">
                            Click Me for things to do!
                        </Link>
                    </div>
                </Parallax>
            </div>
            <div className="cell small-12">
                <PopularDestinationList />
            </div>
            <div className="cell small-12">
                <Parallax
                    className="image-activities"
                    bgImage={image2}
                    bgImageAlt="sky"
                    strength={800}
                >
                    <div className="container-2-activities">
                        <h1 className="page-title cell small-12">Activity List</h1>
                        <ActivitiesList />
                    </div>
                </Parallax>
            </div>
        </div>
    );
};

export default HomePage;
