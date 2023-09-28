import React, { useState } from "react";
import { Link } from "react-router-dom";
import config from "../../config";
import {
    Checkbox,
    Select,
    ListItemText,
    FormControl,
    MenuItem,
    InputLabel,
    Input,
} from "@material-ui/core";
import FormError from "../layout/FormError";
import makeNewUser from "../../services/makeNewUser";
import options from "../../services/userSelections";

const RegistrationForm = () => {
    const [userPayload, setUserPayload] = useState({
        email: "",
        password: "",
        passwordConfirmation: "",
        preferences: [],
    });

    const [errors, setErrors] = useState({});
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

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
            newErrors = { ...newErrors, preferences: "You need at least one Interest!" };
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onPreferencesChange = (event) => {
        const eventArray = event.target.value;
        setUserPayload({
            ...userPayload,
            preferences: eventArray,
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (validateInput(userPayload)) {
            makeNewUser(userPayload).then((resp) => {
                if (resp === "User already exists") {
                    setErrors({ exists: resp });
                } else {
                    setShouldRedirect(true);
                }
            });
        }
    };

    const onInputChange = (event) => {
        setUserPayload({
            ...userPayload,
            [event.currentTarget.name]: event.currentTarget.value,
        });
    };

    if (shouldRedirect) {
        if (Object.keys(errors).length === 0) {
            window.location.href = "/";
        } else {
            setShouldRedirect(false);
        }
    }

    return (
        <div className="landing-page-image">
            <div className="grid-x">
                <div className="container-3">
                    <div className="cell small-12">
                        <h1 className="createable-select-title">Sign-up</h1>
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
                                <FormControl className="basic-multi-select-reg">
                                    <InputLabel id="demo-mutiple-checkbox-label">
                                        Interests
                                    </InputLabel>
                                    <Select
                                        labelId="demo-mutiple-checkbox-label"
                                        id="demo-mutiple-checkbox"
                                        multiple
                                        value={userPayload.preferences}
                                        onChange={onPreferencesChange}
                                        input={<Input />}
                                        renderValue={(selected) => selected.join(", ")}
                                        MenuProps={MenuProps}
                                    >
                                        {options.map((name) => (
                                            <MenuItem key={name.value} value={name.value}>
                                                <Checkbox
                                                    checked={
                                                        userPayload.preferences.indexOf(
                                                            name.value
                                                        ) > -1
                                                    }
                                                />
                                                <ListItemText primary={name.value} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <input
                                    type="submit"
                                    className="button-1-sign-in"
                                    value="Register"
                                />
                                <FormError error={errors.exists} />
                            </div>
                        </div>
                    </form>
                    <p className="sign-in-link cell small-12">
                        Already have an account?
                        <Link to="/landing" className="button-toggle-1">
                            Sign-In Here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
