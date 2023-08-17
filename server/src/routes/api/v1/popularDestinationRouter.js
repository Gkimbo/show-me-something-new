import express from "express";
import CitySerializer from "../../../../serializers/CitySerializer.js";
import CityClientApi from "../../../apiClient/CityClientApi.js";

const popularDestinationRouter = new express.Router();

popularDestinationRouter.get("/", async (req, res) => {
    try {
        const cities = await CityClientApi.getCities();
        const serializedCities = await CitySerializer.getSummaryOfArray(cities);
        return res.status(200).json({ cities: serializedCities });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
});

popularDestinationRouter.get("/:city", async (req, res) => {
    try {
        const city = await CityClientApi.getOneCity(req.params.city);
        const serializedCity = await CitySerializer.getSummaryOfArray(city);
        return res.status(200).json({ city: serializedCity[0] });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
});

export default popularDestinationRouter;
