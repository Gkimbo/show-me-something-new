import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

import ResultList from "./ResultList";

const CustomMap = (props) => {
    const { customActivities } = props;
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState("");

    const loader = new Loader({
        apiKey: "AIzaSyClukZ0HyAZru-8zwolHjvS8SnTCaK3V7c",
        libraries: ["places"],
    });

    useEffect(() => {
        setError("");
        loader.load().then(() => {
            const boston = { lat: 42.361, lng: -71.057 };

            const map = new google.maps.Map(document.getElementById("map"), {
                center: boston,
                zoom: 12,
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

            customActivities.forEach((activity) => {
                const request = {
                    query: activity.name,
                    location: boston,
                    radius: "100",
                };

                service.textSearch(request, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        setSearchResults((prevResults) => [...prevResults, ...results]);
                        addMarkersAndInfoWindows(results);
                        map.setCenter(results[0].geometry.location);
                    } else {
                        setError(`No ${activity.query} found.`);
                    }
                });
            });
        });
    }, [customActivities]);

    return (
        <div className="grid-x home-page-div">
            <div className="cell small-12 medium-6 container-4">
                <div className="cell small-12">
                    <h1>What you like near you!</h1>
                </div>
                <ResultList searchResults={searchResults} />
            </div>
            <div className="cell small-12 medium-6 ">
                <div id="map" className="container-4-map"></div>
            </div>
        </div>
    );
};

export default CustomMap;
