import React, { useEffect, useState } from "react";
import FormError from "../layout/FormError";
import config from "../../config";
import makeNewUser from "../../services/makeNewUser";

const RegistrationForm = () => {
    const [userPayload, setUserPayload] = useState({
        email: "",
        password: "",
        passwordConfirmation: "",
        preferences: [],
    });

    const [errors, setErrors] = useState({});
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const validateInput = (payload) => {
        const { email, password, passwordConfirmation, preferences } = payload;
        const emailRegexp = config.validation.email.regexp;
        let newErrors = {};

        if (!email.match(emailRegexp)) {
            newErrors = { ...newErrors, email: "is invalid" };
        }

        if (password.trim() === "") {
            newErrors = { ...newErrors, password: "is required" };
        }

        if (passwordConfirmation.trim() === "") {
            newErrors = { ...newErrors, passwordConfirmation: "is required" };
        } else {
            if (passwordConfirmation !== password) {
                newErrors = { ...newErrors, passwordConfirmation: "does not match password" };
            }
        }

        if (preferences.length === 0) {
            newErrors = { ...newErrors, preferences: "You need at least one preference!" };
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onPreferencesChange = (event) => {
        const enteredValue = event.target.value;
        const newPreferences = enteredValue
            .split(",")
            .map((pref) => pref.trim())
            .filter((pref) => pref !== "");

        setUserPayload({
            ...userPayload,
            preferences: newPreferences,
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (validateInput(userPayload)) {
            makeNewUser(userPayload);
            setShouldRedirect(true);
        }
    };

    const onInputChange = (event) => {
        setUserPayload({
            ...userPayload,
            [event.currentTarget.name]: event.currentTarget.value,
        });
    };

    if (shouldRedirect) {
        location.href = "/home";
    }

    return (
        <div className="grid-x">
            <div className="container-3">
                <div className="cell small-12">
                    <h1>Sign-up</h1>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="cell small-12">
                        <div>
                            <label>
                                Email
                                <input
                                    type="text"
                                    name="email"
                                    value={userPayload.email}
                                    onChange={onInputChange}
                                    className="form-fields"
                                />
                                <FormError error={errors.email} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Password
                                <input
                                    type="password"
                                    name="password"
                                    value={userPayload.password}
                                    onChange={onInputChange}
                                    className="form-fields"
                                />
                                <FormError error={errors.password} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Password Confirmation
                                <input
                                    type="password"
                                    name="passwordConfirmation"
                                    value={userPayload.passwordConfirmation}
                                    onChange={onInputChange}
                                    className="form-fields"
                                />
                                <FormError error={errors.passwordConfirmation} />
                            </label>
                        </div>
                        <div className="preferences-div">
                            <label htmlFor="preferences">
                                Type things you like!
                                <input
                                    type="text"
                                    id="preferences"
                                    name="preferences"
                                    placeholder="Golfing, Pottery, Parks, Restaurants, Breweries...."
                                    onChange={onPreferencesChange}
                                    className="form-fields"
                                />
                                <FormError error={errors.preferences} />
                            </label>
                        </div>
                        <div>
                            <input type="submit" className="button-1" value="Register" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
