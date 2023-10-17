import React from "react";
import { Link } from "react-router-dom";

import ActivitySearchBar from "./ActivitySearchBar.js";
import SignOutButton from "../authentication/SignOutButton.js";
import Logo from "./Logo.js";

const TopBar = ({ user, mapSearchQuery }) => {
    const authenticatedListItems = [
        <li key="sign-up">
            <Link to="/manage-preferences" className="button-1 update-button">
                {user && user.username === "admin" ? "Update All Interests" : "Update Interests"}
            </Link>
        </li>,
        <li key="sign-out">
            <SignOutButton />
        </li>,
    ];

    return (
        <div className="grid-x nav-bar">
            <div className="cell small-4">
                <div className="nav-bar-left">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
            </div>
            <div className="cell small-8">
                <div className="nav-bar-right">
                    <ul>{user ? authenticatedListItems : null}</ul>
                </div>
            </div>
            <div className="cell small-12 search-bar-1">
                <div className="nav-bar-center">
                    {user && !mapSearchQuery ? <ActivitySearchBar /> : null}
                </div>
            </div>
        </div>
    );
};

export default TopBar;
