import got from "got";
import dotenv from "dotenv"
dotenv.config()

const cityApiKey = process.env.API_NINJA_API_KEY;
const baseUrl = "https://api.api-ninjas.com"

class CityClientApi {
    static async getCities() {
        try {
            const apiResponse = await got({
                url: `${baseUrl}` + "/v1/city?country=us&limit=30",
                headers: {
                    'X-Api-Key': `${cityApiKey}`
                }})
            const responseBody = apiResponse.body;
            return responseBody;
        } catch (error) {
            return { error: error.message };
        }
    }
}

export default CityClientApi;
