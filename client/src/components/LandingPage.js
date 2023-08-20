import React from "react";
import { Link } from "react-router-dom";
import SignInForm from "./authentication/SignInForm";
import RegistrationForm from "./registration/RegistrationForm";

const LandingPage = (props) => {
    return (
        <div className="grid-x">
            <div className="landing-page cell small-12 medium-6">
                <div className="landing-page-description container-2">
                    <h2>Welcome to WithinReach </h2>
                    <ul>
                        <li>Your personalized guide to discovering new surroundings!</li>
                        <li>One click unlocks the world around you!</li>
                        <li>
                            Say goodbye to the hassle of searching – our location-based platform
                            instantly shows you the best places, events, and more, all perfectly
                            matched to your preferences.
                        </li>
                        <li>
                            Join us today and start your journey of seamless exploration with
                            WithinReach!
                        </li>
                    </ul>
                </div>
            </div>
            <div className="landing-page cell small-12 medium-6">
                <SignInForm />
                <p className="alt-link">
                    If you don't have an account
                    <Link to="/users/new" className="button-1">
                        sign-up here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LandingPage;
