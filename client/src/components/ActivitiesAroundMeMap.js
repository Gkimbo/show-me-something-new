import React, { useEffect, useState, useReducer } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import Skeleton from "@material-ui/lab/Skeleton";
import { Box, Grid } from "@material-ui/core";
import _ from "lodash";
import reducer from "./ReducerFunction/ReducerFunction";

import ResultList from "./ResultList";
import LocationSearchBar from "./LocationSearchBar";

const ActivitiesAroundMeMap = (props) => {
    const [state, dispatch] = useReducer(reducer, { chosenLocation: null });

    const [searchResults, setSearchResults] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [openInfoWindow, setOpenInfoWindow] = useState(null);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [error, setError] = useState("");

    const loader = new Loader({
        apiKey: "AIzaSyClukZ0HyAZru-8zwolHjvS8SnTCaK3V7c",
        libraries: ["places"],
    });

    const searchQuery = props.computedMatch.params.name;
    const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const getCurrentPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    dispatch({
                        type: "chosenLocation",
                        chosenLocation: { lat: latitude, lng: longitude },
                    });
                },
                (error) => {
                    setError("Error getting user's location: " + error.message);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };

    const getLocation = (request) => {
        loader.load().then(() => {
            const service = new google.maps.places.PlacesService(map);
            const searchRequest = {
                query: request,
            };
            service.textSearch(searchRequest, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    dispatch({
                        type: "chosenLocation",
                        chosenLocation: results[0].geometry.location,
                    });
                } else {
                    setError(`No results found for "${props.mapSearchQuery}".`);
                    setSearchResults([]);
                }
            });
        });
    };

    const centerMapOnMarker = (marker) => {
        setSelectedMarker(marker === selectedMarker ? null : marker);
    };

    useEffect(() => {
        setError("");
        loader.load().then(() => {
            const request = {
                query: searchQuery,
                location: state.chosenLocation,
                radius: "100",
            };

            const map = new google.maps.Map(document.getElementById("map"), {
                center: state.chosenLocation,
                zoom: 16,
            });

            const userMarker = new google.maps.Marker({
                position: state.chosenLocation,
                map: map,
                icon: {
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                },
                title: "Your Location",
            });

            const service = new google.maps.places.PlacesService(map);

            service.textSearch(request, function (results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    results.forEach((result) => {
                        result.activity = searchQuery;
                    });
                    setSearchResults(results);
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
                            if (openInfoWindow) {
                                openInfoWindow.close();
                            }

                            if (result.geometry.location === selectedMarker) {
                                setSelectedMarker(null);
                                setOpenInfoWindow(null);
                            } else {
                                setSelectedMarker(result.geometry.location);
                                infowindow.open(map, marker);
                                setOpenInfoWindow(infowindow);
                                setSelectedActivity(result.activity);
                            }
                        });
                    });

                    map.setCenter(state.chosenLocation);
                } else {
                    setError("No results found, please try again.");
                }
            });

            setSelectedMarker(null);
        });
    }, [state.chosenLocation]);

    useEffect(() => {
        if (props.mapSearchQuery) {
            getLocation(props.mapSearchQuery);
        } else {
            getCurrentPosition();
        }
    }, []);

    useEffect(() => {
        getLocation(props.mapSearchQuery);
    }, [props.mapSearchQuery]);

    return (
        <div className="grid-x home-page-div">
            <div className="cell small-12 activity-title-1">
                <h1 className="page-title-1">
                    {_.upperFirst(searchQuery)}{" "}
                    {props.mapSearchQuery
                        ? `in ${_.upperFirst(props.mapSearchQuery)}`
                        : "Near you!"}
                </h1>
                <LocationSearchBar setMapSearchQuery={props.setMapSearchQuery} />
            </div>
            <div className="cell small-12 medium-6 container-4">
                <div className="cell small-12"></div>
                {state.chosenLocation === null ? (
                    <Grid container>
                        {skeletonArray.map((num) => {
                            return (
                                <Box marginRight={0.7} my={5}>
                                    <Skeleton variant="rect" width={150} height={115} />
                                    <Skeleton />
                                    <Skeleton />
                                </Box>
                            );
                        })}
                    </Grid>
                ) : (
                    <ResultList
                        searchResults={searchResults}
                        centerMapOnMarker={centerMapOnMarker}
                        markerLocation={selectedMarker}
                        setSelectedMarker={setSelectedMarker}
                        setSelectedActivity={setSelectedActivity}
                        selectedActivity={selectedActivity}
                    />
                )}
                {error ? (
                    <div className="location-error">
                        <h3>{error} </h3>
                        <p>Please search the location you'd like to see in the search bar above</p>
                    </div>
                ) : null}
            </div>
            <div className="cell small-12 medium-6 map-surround">
                {state.chosenLocation === null ? (
                    <Skeleton variant="rect" width={600} height={800} />
                ) : (
                    <div id="map" className="container-4-map"></div>
                )}
            </div>
        </div>
    );
};

export default ActivitiesAroundMeMap;
