import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new" className="button-1">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button-1">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="top-bar grid-x">
      <div className="top-bar-left">
        <ul className="menu">
        <Link to="/home"><i class="fa-solid fa-street-view fa-xl icon-title"></i></Link>
        </ul>
      </div>
      {/* <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div> */}
    </div>
  );
};

export default TopBar;
