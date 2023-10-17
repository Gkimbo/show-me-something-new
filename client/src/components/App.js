import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import { ChakraProvider } from "@chakra-ui/react";

import AuthenticatedRoute from "./authentication/AuthenticatedRoute.js";
import getCurrentUser from "../services/getCurrentUser.js";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm.js";
import TopBar from "./layout/TopBar.js";
import LandingPage from "./LandingPage.js";
import HomePage from "./HomePage.js";
import ActivitiesAroundMeMap from "./maps/ActivitiesAroundMeMap.js";
import CustomMap from "./maps/CustomMap.js";
import CityMap from "./maps/CityMap.js";
import UpdatePreferences from "./UpdatePreferencesPage.js";

const App = (props) => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [mapSearchQuery, setMapSearchQuery] = useState(null);

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
                <TopBar
                    user={currentUser}
                    mapSearchQuery={mapSearchQuery}
                    setMapSearchQuery={setMapSearchQuery}
                />
                <Switch>
                    <AuthenticatedRoute
                        exact={true}
                        path="/"
                        user={currentUser}
                        component={HomePage}
                    />
                    <Route exact path="/landing" component={LandingPage} />
                    <AuthenticatedRoute
                        exact={true}
                        path="/my-activities"
                        component={CustomMap}
                        user={currentUser}
                        mapSearchQuery={mapSearchQuery}
                        setMapSearchQuery={setMapSearchQuery}
                    />
                    <AuthenticatedRoute
                        exact={true}
                        path="/manage-preferences"
                        component={UpdatePreferences}
                        user={currentUser}
                    />
                    <AuthenticatedRoute
                        exact={true}
                        path="/:name"
                        component={CityMap}
                        user={currentUser}
                        mapSearchQuery={mapSearchQuery}
                        setMapSearchQuery={setMapSearchQuery}
                    />
                    <AuthenticatedRoute
                        exact={true}
                        path="/activity/:name"
                        component={ActivitiesAroundMeMap}
                        user={currentUser}
                        mapSearchQuery={mapSearchQuery}
                        setMapSearchQuery={setMapSearchQuery}
                    />
                    <Route exact path="/users/new" component={RegistrationForm} />
                </Switch>
            </Router>
        </ChakraProvider>
    );
};

export default hot(App);
