const loadMap = (location, activities, setSearchResults) => {
    // setError("");
    loader.load().then(() => {
        const map = new google.maps.Map(document.getElementById("map"), {
            center: currentLocation,
            zoom: 13,
        });

        const userMarker = new google.maps.Marker({
            position: location,
            map: map,
            icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            },
            title: "Your Location",
        });

        const service = new google.maps.places.PlacesService(map);

        const addMarkersAndInfoWindows = (places) => {
            places.forEach((result) => {
                const resultContent =
                    `<p>${result.name}</p>` + `<p>${result.formatted_address}</p>`;

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

                marker.addListener("click", () => {
                    infowindow.open({
                        anchor: marker,
                        map,
                    });
                });
            });
        };

        activities.forEach((activity) => {
            const request = {
                query: activity.name,
                location: currentLocation,
                radius: "100",
            };

            service.textSearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    setSearchResults((prevResults) => [...prevResults, ...results]);
                    addMarkersAndInfoWindows(results);
                    map.setCenter(currentLocation);
                } else {
                    setError(`No ${activity.query} found.`);
                }
            });
        });
    });
};

export default MainMap;
