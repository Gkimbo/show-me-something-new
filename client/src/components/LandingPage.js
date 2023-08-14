import React from "react";
import { Link } from "react-router-dom";
import SignInForm from "./authentication/SignInForm";
import RegistrationForm from "./registration/RegistrationForm";

const LandingPage = (props) => {
  return (
    <div className="grid-x landing-page">
      <div className="landing-page-description cell small-12 medium-6">
        <h2>within-reach</h2>
        <p>Discover Within a Mile - The one app you truly need in your life.</p>
        <p>Happiness is just one button away</p>
      </div>
      <div className="cell small-12 medium-6">
        <SignInForm />
        <p className="alt-link">If you don't have an account sign-up <Link to="/users/new">here</Link></p>
      </div>
    </div>
  );
}

export default LandingPage;
