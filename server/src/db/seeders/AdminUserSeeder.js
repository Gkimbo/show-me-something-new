import { User } from "../../models/index.js";

class AdminUserSeeder {
    static async seed() {
        const adminAccounts = [
            {
                email: "ADMIN@ADMIN.com",
                password: "admin1",
                username: "admin",
            },
        ];

        for (const admin of adminAccounts) {
            const currentUser = await User.query().findOne({
                username: admin.username,
            });
            if (!currentUser) {
                await User.query().insert(admin);
            }
        }
    }
}

export default AdminUserSeeder;
