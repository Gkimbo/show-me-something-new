import CityClientApi from "../apiClient/CityClientApi.js";

class CitySerializer {
    static async getSummaryOfArray(array) {
        const allowedAttributes = ["name", "latitude", "longitude"];
        const serializedCities = await Promise.all(
            array.map(async (city) => {
                const eachCitySerialized = {};
                for (const attribute of allowedAttributes) {
                    eachCitySerialized[attribute] = city[attribute];
                }
                const photoOfCity = await CityClientApi.getCityPhotos(city.name);
                eachCitySerialized.url = photoOfCity;
                return eachCitySerialized;
            })
        );
        return serializedCities;
    }
}

export default CitySerializer;
