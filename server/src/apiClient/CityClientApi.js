import got from "got";
import dotenv from "dotenv";
dotenv.config();

const cityApiKey = process.env.API_NINJA_API_KEY;
const photoApiAccessKey = process.env.UNSPLASH_PHOTO_ACCESS_KEY;

class CityClientApi {
    static async getCities() {
        const baseUrl = "https://api.api-ninjas.com";
        try {
            const apiResponse = await got({
                url: `${baseUrl}` + "/v1/city?country=us&limit=30",
                headers: {
                    "X-Api-Key": `${cityApiKey}`,
                },
            });
            const responseBody = apiResponse.body;
            const parsedData = JSON.parse(responseBody);
            return parsedData;
        } catch (error) {
            return { error: error.message };
        }
    }

    static async getOneCity(name) {
        const baseUrl = "https://api.api-ninjas.com";
        try {
            const apiResponse = await got({
                url: `${baseUrl}/v1/city?name=${name}`,
                headers: {
                    "X-Api-Key": `${cityApiKey}`,
                },
            });
            const responseBody = apiResponse.body;
            const parsedData = JSON.parse(responseBody);
            return parsedData;
        } catch (error) {
            return { error: error.message };
        }
    }

    static async getCityPhotos(city) {
        const baseUrl = "https://api.unsplash.com/search/";
        try {
            const url = `${baseUrl}photos/?client_id=${photoApiAccessKey}&query=${city}&count=1&order_by=relevant&orientation=landscape`;
            const apiResponse = await got(url);
            const responseBody = apiResponse.body;
            const parsedData = JSON.parse(responseBody);
            const urlNeeded = parsedData.results[0].urls.regular;
            return urlNeeded;
        } catch (error) {
            return { error: error.message };
        }
    }

    static async getLandscape() {
        const baseUrl = "https://api.unsplash.com/search/";
        try {
            const url = `${baseUrl}photos/?client_id=${photoApiAccessKey}&query=landscape&count=1&order_by=relevant&orientation=landscape`;
            const apiResponse = await got(url);
            const responseBody = apiResponse.body;
            const parsedData = JSON.parse(responseBody);
            const urlNeeded = parsedData.results[5].urls.full;
            return urlNeeded;
        } catch (error) {
            return { error: error.message };
        }
    }
}

export default CityClientApi;
