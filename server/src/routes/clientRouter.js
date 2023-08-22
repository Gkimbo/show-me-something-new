import express from "express";
import getClientIndexPath from "../config/getClientIndexPath.js";

const router = new express.Router();

const clientRoutes = [
    "/",
    "/user-sessions/new",
    "/users/new",
    "/:name",
    "/activity/map",
    "/activity/:name",
    "/my-activities",
    "/landing",
    "/manage-preferences",
];
const authedClientRoutes = ["/profile"];

router.get(authedClientRoutes, (req, res) => {
    if (req.user) {
        res.sendFile(getClientIndexPath());
    } else {
        res.redirect("/user-sessions/new");
    }
});

router.get(clientRoutes, (req, res) => {
    res.sendFile(getClientIndexPath());
});

export default router;
