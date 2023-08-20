import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import { ChakraProvider } from "@chakra-ui/react";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import LandingPage from "./LandingPage";
import HomePage from "./HomePage";
import ActivitiesAroundMeMap from "./ActivitiesAroundMeMap";
import CustomMap from "./CustomMap";
import CityMap from "./CityMap";
import UpdatePreferences from "./UpdatePreferences";

const App = (props) => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const fetchCurrentUser = async () => {
        try {
            const user = await getCurrentUser();
            setCurrentUser(user);
        } catch (err) {
            setCurrentUser(null);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <ChakraProvider>
            <Router>
                <TopBar user={currentUser} />
                <Switch>
                    <Route exact path="/" component={currentUser ? HomePage : LandingPage} />
                    <Route exact path="/my-activities" component={CustomMap} />
                    <Route exact path="/manage-preferences" component={UpdatePreferences} />
                    <Route exact path="/:name" component={CityMap} />
                    <Route exact path="/activity/map" component={ActivitiesAroundMeMap} />
                    <Route exact path="/activity/:name" component={ActivitiesAroundMeMap} />
                    <Route exact path="/users/new" component={RegistrationForm} />
                    <Route exact path="/user-sessions/new" component={SignInForm} />
                </Switch>
            </Router>
        </ChakraProvider>
    );
};

export default hot(App);
