import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

import ResultList from "./ResultList";
import GetActivity from "../services/GetActivity";
import GetDestination from "../services/GetDestination";

const CityMap = (props) => {
    const [chosenLocation, setChosenLocation] = useState({ lat: 42.361, lng: -71.057 });
    const [customActivities, setCustomActivities] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState("");

    const loader = new Loader({
        apiKey: "AIzaSyClukZ0HyAZru-8zwolHjvS8SnTCaK3V7c",
        libraries: ["places"],
    });

    let currentLocation = {
        lat: chosenLocation.latitude,
        lng: chosenLocation.longitude,
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
                        map.setCenter(currentLocation);
                    } else {
                        setError(`No ${activity.query} found.`);
                    }
                });
            });
        });
    }, [chosenLocation]);

    useEffect(() => {
        GetActivity.getCustomActivities().then((activityData) => {
            setCustomActivities(activityData);
        });
        GetDestination.getChosenDestination(props.match.params.name).then((destination) => {
            setChosenLocation(destination);
        });
    }, []);

    return (
        <div className="grid-x home-page-div">
            <div className="cell small-12 medium-6 container-4">
                <div className="cell small-12">
                    <h1>{`What you like in ${props.match.params.name}!`}</h1>
                </div>
                <ResultList searchResults={searchResults} />
            </div>
            <div className="cell small-12 medium-6 ">
                <div id="map" className="container-4-map"></div>
            </div>
        </div>
    );
};

export default CityMap;
