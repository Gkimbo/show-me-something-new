import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SignInForm from "./authentication/SignInForm";

const LandingPage = (props) => {
    return (
        <div className="landing-page-image">
            <div className="grid-x">
                <div className="landing-page cell small-12 medium-6">
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
                <div className="landing-page cell small-12 medium-6">
                    <SignInForm />
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
