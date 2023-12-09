import React from "react";
import SignInForm from "./authentication/SignInForm";
import image2 from "../services/photos/explore.jpg";
import { Parallax } from "react-parallax";

const LandingPage = (props) => {
    return (
        <Parallax className="image-landing" bgImage={image2} bgImageAlt="mug" strength={800}>
            <div className="grid-x">
                <div className="landing-page cell medium-12 large-6">
                    <div className="landing-page-description container-manage">
                        <h2 className="landing-title">Welcome to WithinReach </h2>
                        <ul className="list-landing-page">
                            <li>One click unlocks the world around you!</li>
                            <li>Your personalized guide to discovering new surroundings!</li>
                        </ul>
                        <div className="landing-paragraph">
                            <p>
                                Say goodbye to the hassle of searching – our location-based platform
                                instantly shows you the best places, events, and more, all perfectly
                                matched to your Interests.
                            </p>
                            <p>
                                Join us today and start your journey of seamless exploration with
                                WithinReach!
                            </p>
                        </div>
                    </div>
                </div>
                <div className="landing-page cell medium-12 large-6">
                    <SignInForm />
                </div>
            </div>
        </Parallax>
    );
};

export default LandingPage;
