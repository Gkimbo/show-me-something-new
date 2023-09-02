import React from "react";
import { Link } from "react-router-dom";
import ActivitySearchBar from "../ActivitySearchBar";
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
        <div className="grid-x nav-bar">
            <div className="cell small-6 medium-4">
                <div className="nav-bar-left">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
            </div>
            <div className="cell small-12 medium-4">
                <div className="nave-bar-center">{user ? <ActivitySearchBar /> : null}</div>
            </div>
            <div className="cell small-6 medium-4 ">
                <div className="nav-bar-right">
                    <ul>{user ? authenticatedListItems : null}</ul>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
