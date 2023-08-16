import express from "express";
import { Preference, User } from "../../../models/index.js";

const activityRouter = new express.Router();

activityRouter.get("/", async (req, res) => {
    try {
        const allActivities = await Preference.query();
        return res.status(200).json({ activities: allActivities });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
});

activityRouter.get("/:myActivities", async (req, res) => {
    try {
        const currentUser = await User.query().findById(req.user.id);
        const customActivities = await currentUser.$relatedQuery("preferences");
        return res.status(200).json({ activities: customActivities });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
});

export default activityRouter;
