import React, { useState } from "react";
import config from "../../config";
import FormError from "../layout/FormError";
import { Link } from "react-router-dom";

const SignInForm = () => {
    const [userPayload, setUserPayload] = useState({ email: "", password: "" });
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [errors, setErrors] = useState({});

    const validateInput = (payload) => {
        setErrors({});
        const { email, password } = payload;
        const emailRegexp = config.validation.email.regexp;
        let newErrors = {};
        if (!email.match(emailRegexp)) {
            newErrors = {
                ...newErrors,
                email: "is invalid",
            };
        }

        if (password.trim() === "") {
            newErrors = {
                ...newErrors,
                password: "is required",
            };
        }

        setErrors(newErrors);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        validateInput(userPayload);
        try {
            if (Object.keys(errors).length === 0) {
                const response = await fetch("/api/v1/user-sessions", {
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
        <div className="grid-x container-manage" onSubmit={onSubmit}>
            <div className="cell small-12">
                <h1>Sign-In</h1>
            </div>
            <form>
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
                        <input type="submit" className="button-1-sign-in" value="Sign In" />
                    </div>
                </div>
            </form>
            <p className="alt-link cell small-12">
                Don't have an account?
                <Link to="/users/new" className="button-toggle-1">
                    Sign-Up Here
                </Link>
            </p>
        </div>
    );
};

export default SignInForm;
