import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

import ResultList from "./ResultList";
import LocationSearchBar from "./LocationSearchBar";

const ActivitiesAroundMeMap = (props) => {
    const [chosenLocation, setChosenLocation] = useState(null);
    const [searchQuery, setSearchQuery] = useState(props.computedMatch.params.name);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [openInfoWindow, setOpenInfoWindow] = useState(null);
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
    const centerMapOnMarker = (marker) => {
        setSelectedMarker(marker === selectedMarker ? null : marker);
    };

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
                            let resultContent;
                            if (result.photos) {
                                resultContent =
                                    `<p>${result.name}</p>` +
                                    `<p>${result.formatted_address}</p>` +
                                    `<img src="${
                                        result.photos && result.photos[0].getUrl()
                                    }" alt="${
                                        result.name
                                    }" style="max-width: 100px; max-height: 100px;">`;
                            } else {
                                resultContent =
                                    `<p>${result.name}</p>` + `<p>${result.formatted_address}</p>`;
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

                            marker.addListener("click", () => {
                                if (result.geometry.location === selectedMarker) {
                                    setSelectedMarker(null);
                                } else {
                                    setSelectedMarker(result.geometry.location);
                                    console.log("clicked");
                                    infowindow.open(map, marker);
                                }
                            });

                            marker.addListener("click", () => {
                                if (openInfoWindow) {
                                    openInfoWindow.infoWindow.close();
                                }

                                const infowindow = new google.maps.InfoWindow({
                                    content: resultContent,
                                    ariaLabel: result.name,
                                });

                                infowindow.open(map, marker);
                                setOpenInfoWindow({ infoWindow: infowindow, marker });
                            });
                        });

                        map.setCenter(currentLocation);
                    } else {
                        setError("No results found, please try again.");
                    }
                });
            }
            setSelectedMarker(null);
        });
    }, [chosenLocation]);

    useEffect(() => {
        getLocation();
    }, []);

    return (
        <div className="grid-x home-page-div">
            <div className="cell small-12 activity-title-1">
                <h1>What you like near you!</h1>
                <LocationSearchBar setChosenLocation={setChosenLocation} />
            </div>
            <div className="cell small-12 medium-6 container-4">
                <div className="cell small-12"></div>
                <ResultList
                    searchResults={searchResults}
                    centerMapOnMarker={centerMapOnMarker}
                    markerLocation={selectedMarker}
                    setSelectedMarker={setSelectedMarker}
                />
            </div>
            <div className="cell small-12 medium-6 ">
                <div id="map" className="container-4-map"></div>
            </div>
        </div>
    );
};

export default ActivitiesAroundMeMap;
