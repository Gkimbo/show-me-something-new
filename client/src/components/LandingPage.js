import React from "react";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";

const LandingPage = (props) => {
  return (
    <div className="grid-x landing-page">
      <div className="landing-page-description cell small-12 medium-4">
        <h2>Show Me Something New!</h2>
        <p>The one app you truly need in your life.</p>
        <p>Happiness is just one button away</p>
      </div>
      <div className="cell small-12 medium-4">
        <SignInForm />
      </div>
      <div className="cell small-12 medium-4">
        <RegistrationForm />
      </div>
    </div>
  );
};

export default LandingPage;
