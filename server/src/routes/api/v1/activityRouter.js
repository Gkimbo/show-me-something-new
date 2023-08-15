import express from "express";
import { Preference } from "../../../models/index.js";

const activityRouter = new express.Router();

activityRouter.get("/", async (req, res) => {
    try {
        const allActivities = await Preference.query();
        return res.status(200).json({ activities: allActivities });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
});

export default activityRouter;
