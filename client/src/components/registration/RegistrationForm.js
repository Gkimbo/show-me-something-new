import React, { useState } from "react";
import FormError from "../layout/FormError";
import config from "../../config";

const RegistrationForm = () => {
    const [userPayload, setUserPayload] = useState({
        email: "",
        password: "",
        passwordConfirmation: "",
        preferences: [],
    });
    console.log(userPayload);

    const [errors, setErrors] = useState({});
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const validateInput = (payload) => {
        setErrors({});
        const { email, password, passwordConfirmation } = payload;
        const emailRegexp = config.validation.email.regexp;
        let newErrors = {};
        if (!email.match(emailRegexp)) {
            newErrors = {
                ...newErrors,
                email: "is invalid",
            };
        }

        if (password.trim() == "") {
            newErrors = {
                ...newErrors,
                password: "is required",
            };
        }

        if (passwordConfirmation.trim() === "") {
            newErrors = {
                ...newErrors,
                passwordConfirmation: "is required",
            };
        } else {
            if (passwordConfirmation !== password) {
                newErrors = {
                    ...newErrors,
                    passwordConfirmation: "does not match password",
                };
            }
        }

        setErrors(newErrors);
    };

    const onPreferencesChange = (event) => {
        const selectedPreferences = [...userPayload.preferences];

        if (event.target.value) {
            selectedPreferences.push(event.target.value);
        } else {
            const index = selectedPreferences.indexOf(event.target.value);
            if (index !== -1) {
                selectedPreferences.splice(index, 1);
            }
        }

        setUserPayload({
            ...userPayload,
            preferences: selectedPreferences,
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        validateInput(userPayload);
        try {
            if (Object.keys(errors).length === 0) {
                const response = await fetch("/api/v1/users", {
                    method: "post",
                    body: JSON.stringify(userPayload),
                    headers: new Headers({
                        "Content-Type": "application/json",
                    }),
                });
                if (!response.ok) {
                    const errorMessage = `${response.status} (${response.statusText})`;
                    const error = new Error(errorMessage);
                    throw error;
                }
                const userData = await response.json();
                setShouldRedirect(true);
            }
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`);
        }
    };

    const onInputChange = (event) => {
        setUserPayload({
            ...userPayload,
            [event.currentTarget.name]: event.currentTarget.value,
        });
    };

    if (shouldRedirect) {
        location.href = "/";
    }

    return (
        <div className="grid-x container-3">
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
                            />
                            <FormError error={errors.passwordConfirmation} />
                        </label>
                    </div>
                    <div>
                        <input type="submit" className="button-1" value="Register" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;
