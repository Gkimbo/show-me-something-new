import React from "react";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";

const LandingPage = (props) => {
  return (
    <div className="grid-x">
      <div className="cell small-12 medium-6">
        <SignInForm />
      </div>
      <div className="cell small-12 medium-6">
        <RegistrationForm />
      </div>
    </div>
  );
};

export default LandingPage;
