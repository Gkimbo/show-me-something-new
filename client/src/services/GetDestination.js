class GetDestination {
    static async getDestinations() {
        try {
            const response = await fetch("/api/v1/destinations");
            if (!response) {
                const error = new Error(`${response.status} (${response.statusText})`);
                throw error;
            }
            const responseData = await response.json();
            return responseData.cities;
        } catch (error) {
            console.error("Error in fetch!", error.message);
        }
    }

    static async getChosenDestination(location) {
        try {
            const response = await fetch(`/api/v1/destinations/${location}`);
            if (!response) {
                const error = new Error(`${response.status} (${response.statusText})`);
                throw error;
            }
            const responseData = await response.json();
            return responseData.city;
        } catch (error) {
            console.error("Error in fetch!", error.message);
        }
    }
}

export default GetDestination;
