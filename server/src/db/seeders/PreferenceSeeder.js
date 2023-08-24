import { Preference } from "../../models/index.js";

class PreferenceSeeder {
    static async seed() {
        const preferenceData = [
            {
                name: "Amusement parks",
                icon: '<i class="fa-solid fa-train-subway"></i>',
            },
            {
                name: "Art galleries",
                icon: '<i class="fa-solid fa-palette"></i>',
            },
            {
                name: "Bars",
                icon: '<i class="fa-solid fa-beer-mug-empty"></i>',
            },
            {
                name: "Beaches",
                icon: '<i class="fa-solid fa-umbrella-beach"></i>',
            },
            {
                name: "Bike rental",
                icon: '<i class="fa-solid fa-person-biking"></i>',
            },
            {
                name: "Book stores",
                icon: '<i class="fa-solid fa-book"></i>',
            },
            {
                name: "Botanical gardens",
                icon: '<i class="fa-solid fa-sun-plant-wilt"></i>',
            },
            {
                name: "Bowling alleys",
                icon: '<i class="fa-solid fa-bowling-ball"></i>',
            },
            {
                name: "Cafes",
                icon: '<i class="fa-solid fa-mug-hot"></i>',
            },
            {
                name: "Comedy clubs",
                icon: '<i class="fa-regular fa-face-laugh-squint"></i>',
            },
            {
                name: "Concerts",
                icon: '<i class="fa-solid fa-music"></i>',
            },
            {
                name: "Cooking classes",
                icon: '<i class="fa-solid fa-kitchen-set"></i>',
            },
            {
                name: "Dance studios",
                icon: '<i class="fa-solid fa-music"></i>',
            },
            {
                name: "Escape rooms",
                icon: '<i class="fa-solid fa-door-open"></i>',
            },
            {
                name: "Farmer's markets",
                icon: '<i class="fa-solid fa-shop"></i>',
            },
            {
                name: "Food trucks",
                icon: '<i class="fa-solid fa-utensils"></i>',
            },
            {
                name: "Golf",
                icon: '<i class="fa-solid fa-golf-ball-tee"></i>',
            },
            {
                name: "Gyms",
                icon: '<i class="fa-solid fa-dumbbell"></i>',
            },
            {
                name: "Historical landmarks",
                icon: '<i class="fa-solid fa-landmark"></i>',
            },
            {
                name: "Hiking trails",
                icon: '<i class="fa-solid fa-person-hiking"></i>',
            },
            {
                name: "Horseback riding",
                icon: '<i class="fa-solid fa-horse"></i>',
            },
            {
                name: "Ice skating rinks",
                icon: '<i class="fa-solid fa-person-skating"></i>',
            },
            {
                name: "Karaoke",
                icon: '<i class="fa-solid fa-music"></i>',
            },
            {
                name: "Laser tag arenas",
                icon: '<i class="fa-solid fa-gun"></i>',
            },
            {
                name: "Libraries",
                icon: '<i class="fa-solid fa-book"></i>',
            },
            {
                name: "Live music venues",
                icon: '<i class="fa-solid fa-volume-high"></i>',
            },
            {
                name: "Mini golf",
                icon: '<i class="fa-solid fa-golf-ball-tee"></i>',
            },
            {
                name: "Movie theaters",
                icon: '<i class="fa-solid fa-video"></i>',
            },
            {
                name: "Museums",
                icon: '<i class="fa-solid fa-building-columns"></i>',
            },
            {
                name: "Nightclubs",
                icon: '<i class="fa-solid fa-martini-glass"></i>',
            },
            {
                name: "Parks",
                icon: '<i class="fa-solid fa-dog"></i>',
            },
            {
                name: "Pizza",
                icon: '<i class="fa-solid fa-pizza-slice"></i>',
            },
            {
                name: "Playgrounds",
                icon: '<i class="fa-solid fa-child-reaching"></i>',
            },
            {
                name: "Restaurants",
                icon: '<i class="fa-solid fa-utensils"></i>',
            },
            {
                name: "Rock climbing gyms",
                icon: '<i class="fa-solid fa-hill-rockslide"></i>',
            },
            {
                name: "Science centers",
                icon: '<i class="fa-solid fa-flask"></i>',
            },
            {
                name: "Shopping malls",
                icon: '<i class="fa-solid fa-cart-shopping"></i>',
            },
            {
                name: "Spas",
                icon: '<i class="fa-solid fa-spa"></i>',
            },
            {
                name: "Sushi bars",
                icon: '<i class="fa-solid fa-utensils"></i>',
            },
            {
                name: "Swimming pools",
                icon: '<i class="fa-solid fa-person-swimming"></i>',
            },
            {
                name: "Tennis",
                icon: '<i class="fa-solid fa-table-tennis-paddle-ball"></i>',
            },
            {
                name: "Trampoline parks",
                icon: '<i class="fa-regular fa-circle"></i>',
            },
            {
                name: "Wineries",
                icon: '<i class="fa-solid fa-wine-glass"></i>',
            },
            {
                name: "Wine-tasting",
                icon: '<i class="fa-solid fa-wine-glass"></i>',
            },
            {
                name: "Yoga studios",
                icon: '<i class="fa-brands fa-angellist"></i>',
            },
            {
                name: "Zoos and Aquariums",
                icon: '<i class="fa-solid fa-otter"></i>',
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
