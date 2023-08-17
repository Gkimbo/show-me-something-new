import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

import ResultList from "./ResultList";
import LocationSearchBar from "./LocationSearchBar";

const ActivitiesAroundMeMap = (props) => {
    const [chosenLocation, setChosenLocation] = useState(null);
    const [searchQuery, setSearchQuery] = useState(props.match.params.name);
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState("");

    const loader = new Loader({
        apiKey: "AIzaSyClukZ0HyAZru-8zwolHjvS8SnTCaK3V7c",
        libraries: ["places"],
    });
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setChosenLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    setError("Error getting user's location: " + error.message);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };
    const currentLocation = chosenLocation;

    useEffect(() => {
        setError("");
        loader.load().then(() => {
            const request = {
                query: searchQuery,
                location: currentLocation,
                radius: "100",
            };

            const map = new google.maps.Map(document.getElementById("map"), {
                center: currentLocation,
                zoom: 12,
            });

            const userMarker = new google.maps.Marker({
                position: currentLocation,
                map: map,
                icon: {
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                },
                title: "Your Location",
            });

            const service = new google.maps.places.PlacesService(map);
            if (searchQuery) {
                service.textSearch(request, function (results, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        setSearchResults(results);
                        results.forEach((result) => {
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

                        map.setCenter(currentLocation);
                    } else {
                        setError("No results found, please try again.");
                    }
                });
            }
        });
    }, [chosenLocation]);

    useEffect(() => {
        getLocation();
    }, []);

    return (
        <div className="grid-x home-page-div">
            <div className="cell small-12 medium-6 container-4">
                <div className="cell small-12">
                    <h1>{props.match.params.name} near you!</h1>
                </div>
                <ResultList searchResults={searchResults} />
            </div>
            <div className="cell small-12 medium-6 ">
                {!currentLocation ? (
                    <LocationSearchBar setChosenLocation={setChosenLocation} />
                ) : null}
                <div id="map" className="container-4-map"></div>
            </div>
        </div>
    );
};

export default ActivitiesAroundMeMap;
