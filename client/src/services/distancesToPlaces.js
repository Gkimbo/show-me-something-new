import React from "react";
import { Loader } from "@googlemaps/js-api-loader";

const googleMapsLoader = new Loader({
    apiKey: "AIzaSyClukZ0HyAZru-8zwolHjvS8SnTCaK3V7c",
    libraries: ["places"],
});

const distancesToPlaces = async (destination, myLocation, modeOfTransportation) => {
    const routeInfo = googleMapsLoader.load().then(() => {
        const request = {
            destination: destination,
            origin: myLocation,
            travelMode: modeOfTransportation,
        };
        const directionsService = new google.maps.DirectionsService();

        const practiceInfo = directionsService.route(request, (result, status) => {
            if (status === "OK") {
                const route = result.routes[0];
                const leg = route.legs[0];
                const distance = leg.distance.text;
                const time = leg.duration.text;
                const info = distance + time;
                return info;
            } else {
                console.log("Directions request failed:", status);
            }
        });
        return practiceInfo;
    });
    const info = await routeInfo;
    const route = info.routes[0];
    const leg = route.legs[0];
    const distance = leg.distance.text;
    const time = leg.duration.text;
    return (
        <ul>
            <li>{`Distance: ${distance}`}</li>
            <li>{`Time: ${time}`}</li>
        </ul>
    );
};

export default distancesToPlaces;
