import { Loader } from "@googlemaps/js-api-loader";

const googleMapsLoader = new Loader({
    apiKey: "AIzaSyClukZ0HyAZru-8zwolHjvS8SnTCaK3V7c",
    libraries: ["places"],
});

const distancesToPlaces = (destination, myLocation, modeOfTransportation) => {
    googleMapsLoader.load().then(() => {
        const request = {
            destination: destination,
            origin: myLocation,
            travelMode: modeOfTransportation,
        };
        const directionsService = new google.maps.DirectionsService();

        directionsService.route(request, (result, status) => {
            if (status === "OK") {
                const route = result.routes[0];
                const leg = route.legs[0];
                const distance = leg.distance.text;
                const time = leg.duration.text;
                info = distance + time;
            } else {
                console.log("Directions request failed:", status);
            }
        });
    });
};

export default distancesToPlaces;
