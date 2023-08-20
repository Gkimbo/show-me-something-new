import express from "express";
import passport from "passport";
import { User } from "../../../models/index.js";
import AddPreferenceToDatabase from "../../../services/AddPreferenceToDatabase.js";
import userPreferencesRouter from "./userPreferencesRouter.js";

const usersRouter = new express.Router();

usersRouter.use("/preferences", userPreferencesRouter);

usersRouter.post("/", async (req, res) => {
    const { email, password, passwordConfirmation, preferences } = req.body;
    try {
        const persistedUser = await User.query().insertAndFetch({ email, password });
        await AddPreferenceToDatabase.addPreferencesArray(preferences, persistedUser);
        return req.login(persistedUser, () => {
            return res.status(201).json({ user: persistedUser });
        });
    } catch (error) {
        return res.status(422).json({ errors: error });
    }
});

export default usersRouter;
