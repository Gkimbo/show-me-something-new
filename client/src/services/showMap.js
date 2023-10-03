import { Loader } from "@googlemaps/js-api-loader";

const googleMapsLoader = new Loader({
    apiKey: "AIzaSyClukZ0HyAZru-8zwolHjvS8SnTCaK3V7c",
    libraries: ["places"],
});

const showMap = (selectedLocation, myLocation) => {
    googleMapsLoader.load().then(() => {
        const request = {
            destination: selectedLocation,
            origin: myLocation,
            travelMode: "WALKING",
        };

        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();

        const mapElement = document.getElementById("map");
        const map = new google.maps.Map(mapElement, {
            center: myLocation,
            zoom: 14,
        });

        directionsRenderer.setMap(map);
        const startMarker = new google.maps.Marker({
            position: myLocation,
            label: {
                text: "Start",
                color: "blue",
            },
        });

        directionsService.route(request, (result, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(result);
                displayRouteInformation(result, map);
            } else {
                console.log("Directions request failed:", status);
            }
        });
    });

    function displayRouteInformation(result, map) {
        const route = result.routes[0];
        const leg = route.legs[0];

        const infoWindow = new google.maps.InfoWindow({
            content: `
                <h2>Route Information</h2>
                <p>Distance: ${leg.distance.text}</p>
                <p>Time: ${leg.duration.text}</p>
            `,
        });

        infoWindow.setPosition(map.getCenter());
        infoWindow.open(map);
    }
};

export default showMap;
