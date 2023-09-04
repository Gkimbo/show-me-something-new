/* eslint-disable no-console */
import { connection } from "../boot.js";
import AdminUserSeeder from "./seeders/AdminUserSeeder.js";
import PreferenceSeeder from "./seeders/PreferenceSeeder.js";

class Seeder {
    static async seed() {
        // include individual seed commands here
        console.log("seeding Preferences!");
        await PreferenceSeeder.seed();

        console.log("seeding Administrators Accounts");
        await AdminUserSeeder.seed();

        console.log("Done!");
        await connection.destroy();
    }
}

export default Seeder;
