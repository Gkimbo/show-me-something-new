import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import Logo from "../Logo";

const TopBar = ({ user }) => {
    const authenticatedListItems = [
        <li key="sign-up">
            <Link to="/manage-preferences" className="button-1 update-button">
                Update Interests
            </Link>
        </li>,
        <li key="sign-out">
            <SignOutButton />
        </li>,
    ];

    return (
        <div className="nav-bar">
            <div className="nav-bar-left">
                <Link to="/">
                    <Logo />
                </Link>
            </div>
            <div className="nav-bar-right">
                <ul>{user ? authenticatedListItems : null}</ul>
            </div>
        </div>
    );
};

export default TopBar;
