import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const authenticatedListItems = [
    <li key="sign-up">
      <Link to="/users/new" className="button-1">
        Update preferences
      </Link>
    </li>,
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="top-bar grid-x">
      <div className="top-bar-left">
        <ul className="menu">
          <Link to="/">
            <i className="fa-solid fa-street-view fa-xl icon-title"></i>
          </Link>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : null}</ul>
      </div>
    </div>
  );
};

export default TopBar;
