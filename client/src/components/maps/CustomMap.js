import React, { useEffect, useRef, useReducer } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import reducer from "../ReducerFunction/ReducerFunction.js";

import ResultList from "../listComponents/ResultList.js";
import GetActivity from "../../services/GetActivity.js";
import LocationSearchBar from "../layout/LocationSearchBar.js";
import showMap from "../../services/showMap.js";
import TransitSelectionButton from "../radioButtons/TransitSelectionButtons.js";

const CustomMap = (props) => {
    const [state, dispatch] = useReducer(reducer, {
        chosenLocation: null,
        customActivities: [],
        searchResults: [],
        selectedMarker: null,
        openInfoWindow: null,
        selectedActivity: null,
        selectedPlaceName: null,
        modeOfTransportation: "WALKING",
        error: "",
    });
    const mapRef = useRef(null);
    const loader = new Loader({
        apiKey: "AIzaSyClukZ0HyAZru-8zwolHjvS8SnTCaK3V7c",
        libraries: ["places"],
    });

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
                    dispatch({
                        type: "error",
                        error: "Error getting user's location: " + error.message,
                    });
                }
            );
        } else {
            dispatch({ type: "error", error: "Geolocation is not supported by this browser." });
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
                    dispatch({
                        type: "error",
                        error: `No results found for "${props.mapSearchQuery}".`,
                    });
                    dispatch({
                        type: "searchResults",
                        searchResults: [],
                    });
                }
            });
        });
    };

    const centerMapOnMarker = (marker) => {
        dispatch({
            type: "selectedMarker",
            selectedMarker: marker === state.selectedMarker ? null : marker,
        });
    };

    useEffect(() => {
        if (state.selectedMarker === null) {
            dispatch({ type: "error", error: "" });
            loader.load().then(() => {
                const map = new google.maps.Map(document.getElementById("map"), {
                    center: state.chosenLocation,
                    zoom: 14,
                });
                mapRef.current = map;
                const userMarker = new google.maps.Marker({
                    position: state.chosenLocation,
                    map: map,
                    icon: {
                        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    },
                    title: "Your Location",
                });

                const service = new google.maps.places.PlacesService(map);

                const addMarkersAndInfoWindows = (places) => {
                    places.forEach((result) => {
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

                        const marker = new google.maps.Marker({
                            position: new google.maps.LatLng(
                                result.geometry.location.lat(),
                                result.geometry.location.lng()
                            ),
                            map: map,
                        });

                        const infowindow = new google.maps.InfoWindow({
                            content: resultContent,
                            ariaLabel: result.name,
                        });

                        marker.addListener("click", () => {
                            dispatch({
                                type: "selectedMarker",
                                selectedMarker: result.geometry.location,
                            });
                            infowindow.open(map, marker);
                            dispatch({ type: "openInfoWindow", openInfoWindow: infowindow });
                            dispatch({
                                type: "selectedActivity",
                                selectedActivity: result.activity,
                            });
                            dispatch({ type: "selectedPlaceName", selectedPlaceName: result.name });
                        });
                    });
                };

                state.customActivities.map((activity) => {
                    const request = {
                        query: activity.name,
                        location: state.chosenLocation,
                        radius: "100",
                    };

                    service.textSearch(request, (results, status) => {
                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                            results.forEach((result) => {
                                result.activity = activity.name;
                            });
                            dispatch({
                                type: "searchResults",
                                searchResults: (prevResults) => [...results, ...prevResults],
                            });
                            addMarkersAndInfoWindows(results);
                            map.setCenter(state.chosenLocation);
                        } else {
                            dispatch({ type: "error", error: `No ${activity.query} found.` });
                        }
                    });
                });

                dispatch({ type: "selectedMarker", selectedMarker: null });
            });
        }
    }, [state.chosenLocation, state.selectedMarker]);

    useEffect(() => {
        GetActivity.getCustomActivities().then((activityData) => {
            dispatch({ type: "customActivities", customActivities: activityData });
        });
        getCurrentPosition();
    }, []);

    useEffect(() => {
        getLocation(props.mapSearchQuery);
    }, [props.mapSearchQuery]);

    useEffect(() => {
        if (state.selectedMarker) {
            showMap(state.selectedMarker, state.chosenLocation, state.modeOfTransportation);
        }
    }, [state.selectedMarker, state.modeOfTransportation]);

    return (
        <div className="grid-x home-page-div">
            <div className="cell small-12 activity-title-1">
                <h1 className="page-title-1">
                    What you like{" "}
                    {props.mapSearchQuery
                        ? `in ${_.upperFirst(props.mapSearchQuery)}`
                        : "Near you!"}
                </h1>
                <LocationSearchBar setMapSearchQuery={props.setMapSearchQuery} />
                <TransitSelectionButton dispatch={dispatch} />
            </div>
            <div className="cell small-12 medium-6 container-of-containers">
                {state.error ? (
                    <div className="location-error">
                        <h3>{state.error} </h3>
                        <p>Please search the location you'd like to see in the search bar above</p>
                    </div>
                ) : null}
                {state.chosenLocation === null ? (
                    <Box pt={0.5} align="center">
                        <Skeleton width="50%" height="100px" />
                        <Skeleton width="50%" height="100px" />
                        <Skeleton width="50%" height="100px" />
                        <Skeleton width="50%" height="100px" />
                    </Box>
                ) : (
                    <ResultList
                        dispatch={dispatch}
                        state={state}
                        centerMapOnMarker={centerMapOnMarker}
                    />
                )}
            </div>
            <div className="cell small-12 medium-6 ">
                {state.chosenLocation === null ? (
                    <Box pt={0.5} align="center">
                        <Skeleton variant="rect" width={600} height={800} />
                    </Box>
                ) : (
                    <div id="map" className="container-4-map"></div>
                )}
            </div>
        </div>
    );
};

export default CustomMap;
