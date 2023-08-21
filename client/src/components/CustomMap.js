import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

import ResultList from "./ResultList";
import GetActivity from "../services/GetActivity";
import LocationSearchBar from "./LocationSearchBar";

const CustomMap = (props) => {
    const [chosenLocation, setChosenLocation] = useState(null);
    const [customActivities, setCustomActivities] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
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
            const map = new google.maps.Map(document.getElementById("map"), {
                center: currentLocation,
                zoom: 13,
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
                    location: currentLocation,
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
            setSelectedMarker(null);
        });
    }, [chosenLocation]);

    useEffect(() => {
        GetActivity.getCustomActivities().then((activityData) => {
            setCustomActivities(activityData);
        });
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

export default CustomMap;
