import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
    apiKey: "AIzaSyClukZ0HyAZru-8zwolHjvS8SnTCaK3V7c",
    libraries: ["places"],
});

const showMap = (selectedLocation, myLocation, selectedName) => {
    loader.load().then(() => {
        const request = {
            query: selectedName,
            location: selectedLocation,
            radius: "1",
        };

        const map = new google.maps.Map(document.getElementById("map"), {
            center: selectedLocation,
            zoom: 14,
        });

        const userMarker = new google.maps.Marker({
            position: myLocation,
            map: map,
            icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            },
            title: "Your Location",
        });

        const service = new google.maps.places.PlacesService(map);

        service.textSearch(request, function (results, status) {
            results.forEach((result) => {
                let resultContent;
                if (result.photos) {
                    resultContent =
                        `<p>${result.name}</p>` +
                        `<p>${result.formatted_address}</p>` +
                        `<img src="${result.photos && result.photos[0].getUrl()}" alt="${
                            result.name
                        }" style="max-width: 100px; max-height: 100px;">`;
                } else {
                    resultContent = `<p>${result.name}</p>` + `<p>${result.formatted_address}</p>`;
                }

                const infowindow = new google.maps.InfoWindow({
                    content: resultContent,
                    ariaLabel: result.name,
                });

                const marker = new google.maps.Marker({
                    position: new google.maps.LatLng(
                        result.geometry.location.lat(),
                        result.geometry.location.lng()
                    ),
                    map: map,
                });

                infowindow.open(map, marker);
            });
        });
    });
};

export default showMap;
