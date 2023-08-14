import express from "express";
import CityClientApi from "../../../apiClient/CityClientApi.js";
const popularDestinationRouter = new express.Router();

popularDestinationRouter.get("/", async (req, res) => {
    try {
        const cities = await CityClientApi.getCities();
        return res.status(200).json({ cities });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
});

export default popularDestinationRouter;
