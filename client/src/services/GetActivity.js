class GetActivity {
    static async getCustomActivities() {
        try {
            const response = await fetch("/api/v1/activity/my-activities");
            if (!response) {
                const error = new Error(`${response.status} (${response.statusText})`);
                throw error;
            }
            const responseData = await response.json();
            return responseData.activities;
        } catch (error) {
            console.error("Error in fetch", error.message);
        }
    }

    static async getAllActivities() {
        try {
            const response = await fetch("/api/v1/activity");
            if (!response) {
                const error = new Error(`${response.status} (${response.statusText})`);
                throw error;
            }
            const responseData = await response.json();
            return responseData.activities;
        } catch (error) {
            console.error("Error in fetch", error.message);
        }
    }
}

export default GetActivity;
