import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import { ChakraProvider } from "@chakra-ui/react";

import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
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
                    <Route exact path="/" component={LandingPage} />
                    <AuthenticatedRoute
                        exact={true}
                        path="/home"
                        user={currentUser}
                        component={HomePage}
                    />
                    <AuthenticatedRoute
                        exact={true}
                        path="/my-activities"
                        component={CustomMap}
                        user={currentUser}
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
                    />
                    <AuthenticatedRoute
                        exact={true}
                        path="/activity/:name"
                        component={ActivitiesAroundMeMap}
                        user={currentUser}
                    />
                    <Route exact path="/users/new" component={RegistrationForm} />
                </Switch>
            </Router>
        </ChakraProvider>
    );
};

export default hot(App);
