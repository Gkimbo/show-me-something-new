import express from "express";
import CityClientApi from "../../../apiClient/CityClientApi.js";

const backgroundRouter = new express.Router();

backgroundRouter.get("/", async (req, res) => {
    try {
        const landscape = await CityClientApi.getLandscape();
        return res.status(200).json(landscape);
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
});

export default backgroundRouter;
