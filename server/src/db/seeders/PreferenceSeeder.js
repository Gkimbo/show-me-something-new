import { Preference } from "../../models/index.js";

class PreferenceSeeder {
    static async seed() {
        const preferenceData = [
            {
                name: "Restaurants",
            },
            {
                name: "Yoga studios",
            },
            {
                name: "Escape rooms",
            },
            {
                name: "Botanical gardens",
            },
            {
                name: "Ice skating rinks",
            },
            {
                name: "Mini golf courses",
            },
            {
                name: "Farmer's markets",
            },
            {
                name: "Historical landmarks",
            },
            {
                name: "Science centers",
            },
            {
                name: "Wineries",
            },
            {
                name: "Nightclubs",
            },
            {
                name: "Spas",
            },
            {
                name: "Libraries",
            },
            {
                name: "Concert venues",
            },
            {
                name: "Amusement parks",
            },
            {
                name: "Zoos",
            },
            {
                name: "Art galleries",
            },
            {
                name: "Bowling alleys",
            },
            {
                name: "Beaches",
            },
            {
                name: "Hiking trails",
            },
            {
                name: "Swimming pools",
            },
            {
                name: "Gyms",
            },
            {
                name: "Shopping malls",
            },
            {
                name: "Movie theaters",
            },
            {
                name: "Museums",
            },
            {
                name: "Parks",
            },
            {
                name: "Cafes",
            },
            {
                name: "Playgrounds",
            },
            {
                name: "Bike rental",
            },
            {
                name: "Cooking classes",
            },
            {
                name: "Wine tasting rooms",
            },
            {
                name: "Karaoke",
            },
            {
                name: "Horseback riding",
            },
            {
                name: "Comedy clubs",
            },
            {
                name: "Laser tag arenas",
            },
            {
                name: "Trampoline parks",
            },
            {
                name: "Rock climbing gyms",
            },
            {
                name: "Pottery studios",
            },
            {
                name: "Sushi bars",
            },
            {
                name: "Rock climbing gyms",
            },
            {
                name: "Food trucks",
            },
            {
                name: "Wildlife sanctuaries",
            },
            {
                name: "Antique shops",
            },
            {
                name: "Indoor water parks",
            },
            {
                name: "Virtual reality arcades",
            },
            {
                name: "Botanical gardens",
            },
            {
                name: "Live music venues",
            },
            {
                name: "Dance studios",
            },
        ];

        for (const eachPreference of preferenceData) {
            const currentPreference = await Preference.query().findOne({
                name: eachPreference.name,
            });
            if (!currentPreference) {
                await Preference.query().insert(eachPreference);
            }
        }
    }
}

export default PreferenceSeeder;
