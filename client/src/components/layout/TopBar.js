import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import Logo from "../Logo";

const TopBar = ({ user }) => {
    const authenticatedListItems = [
        <li key="sign-up">
            <Link to="/manage-preferences" className="button-1">
                Update Interests
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
                    <Link to="/home">
                        <Logo />
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
