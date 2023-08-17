import express from "express";
import { Preference, User } from "../../../models/index.js";
import PreferenceSerializer from "../../../../serializers/PreferenceSerializer.js";

const activityRouter = new express.Router();

activityRouter.get("/", async (req, res) => {
    try {
        const allPreferences = await Preference.query();
        const serializedUserPreferences = PreferenceSerializer.getSummaryOfArray(allPreferences);
        return res.status(200).json({ activities: serializedUserPreferences });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
});

activityRouter.get("/:my-activities", async (req, res) => {
    try {
        const currentUser = await User.query().findById(req.user.id);
        const customPreferences = await currentUser.$relatedQuery("preferences");
        const serializedUserPreferences = PreferenceSerializer.getSummaryOfArray(customPreferences);
        return res.status(200).json({ activities: serializedUserPreferences });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
});

export default activityRouter;
