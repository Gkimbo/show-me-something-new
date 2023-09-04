import express from "express";
import { ValidationError } from "objection";
import { Preference, UserPreference, User } from "../../../models/index.js";
import _ from "lodash";
import cleanUserInput from "../../../services/cleanUserInput.js";
import AddPreferenceToDatabase from "../../../services/AddPreferenceToDatabase.js";
import PreferenceSerializer from "../../../serializers/PreferenceSerializer.js";

const userPreferencesRouter = new express.Router({ mergeParams: true });

userPreferencesRouter.post("/", async (req, res) => {
    const { name } = req.body;
    if (req.user.username === "admin") {
        try {
            await AddPreferenceToDatabase.adminAddPreference(name);
            const preferences = await Preference.query();
            const serializedPreferences = PreferenceSerializer.getSummaryOfArray(preferences);
            return res.status(201).json({ preferences: serializedPreferences });
        } catch (error) {
            return res.status(422).json({ errors: error });
        }
    } else {
        try {
            const user = await User.query().findOne({ id: req.user.id });
            await AddPreferenceToDatabase.addOnePreference(name, user);
            const preferences = await user.$relatedQuery("preferences");
            const serializedPreferences = PreferenceSerializer.getSummaryOfArray(preferences);
            return res.status(201).json({ preferences: serializedPreferences });
        } catch (error) {
            return res.status(422).json({ errors: error });
        }
    }
});

userPreferencesRouter.delete("/:preferenceId", async (req, res) => {
    if (req.user.username === "admin") {
        try {
            const preferenceToDelete = await Preference.query().findById(req.params.preferenceId);
            return res.status(200).json({ preference: preferenceToDelete });
        } catch (err) {
            return res.status(500).json({ errors: err });
        }
    } else {
        try {
            const preferenceToDelete = await Preference.query().findById(req.params.preferenceId);
            const userPreferenceToDelete = await UserPreference.query().findOne({
                preferenceId: req.params.preferenceId,
                userId: req.user.id,
            });
            await userPreferenceToDelete.$query().delete();
            return res.status(200).json({ preference: preferenceToDelete });
        } catch (err) {
            return res.status(500).json({ errors: err });
        }
    }
});

userPreferencesRouter.patch("/:preferenceId", async (req, res) => {
    const editedPreference = cleanUserInput(req.body);
    const lowercasePreference = editedPreference.name.toLowerCase();
    const upperCase = _.upperFirst(lowercasePreference);
    try {
        const userPreferenceToDelete = await UserPreference.query().findOne({
            preferenceId: req.params.preferenceId,
            userId: req.user.id,
        });
        await userPreferenceToDelete.$query().delete();
        const user = await User.query().findOne({ id: req.user.id });
        await AddPreferenceToDatabase.addOnePreference(editedPreference.name, user);
        const preference = await Preference.query().findOne({ name: upperCase });
        const serializedPreference = PreferenceSerializer.getSummaryOfOne(preference);
        return res.status(201).json(serializedPreference);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error.data });
        }
        return res.status(500).json({ errors: error });
    }
});

export default userPreferencesRouter;
