/* eslint-disable no-console */
import { connection } from "../boot.js";
import PreferenceSeeder from "./seeders/PreferenceSeeder.js";

class Seeder {
    static async seed() {
        // include individual seed commands here
        console.log("seeding Preferences!");
        await PreferenceSeeder.seed();

        console.log("Done!");
        await connection.destroy();
    }
}

export default Seeder;
