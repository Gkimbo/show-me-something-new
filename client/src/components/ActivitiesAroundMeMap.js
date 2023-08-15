import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

import ResultList from "./ResultList";

const ActivitiesAroundMeMap = (props) => {
  console.log(props.match.params.name);
  const [searchQuery, setSearchQuery] = useState("");
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

      const request = {
        query: searchQuery,
        location: boston,
        radius: "100",
      };

      const map = new google.maps.Map(document.getElementById("map"), {
        center: boston,
        zoom: 12,
      });

      const service = new google.maps.places.PlacesService(map);
      if (searchQuery) {
        service.textSearch(request, function (results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            setSearchResults(results);
            results.forEach((result) => {
              const resultContent = `<p>${result.name}</p>` + `<p>${result.formatted_address}</p>`;

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

            map.setCenter(results[0].geometry.location);
          } else {
            setError("No results found, please try again.");
          }
        });
      }
    });
  }, [searchQuery]);

  useEffect(() => {
    setSearchQuery(props.match.params.name);
  }, []);

  return (
    <div className="grid-x home-page-div">
      <div className="cell small-12">
        <h1>{props.match.params.name} near you!</h1>
      </div>
      <p className="error">{error}</p>
      <div
        id="map"
        style={{ height: 400, width: 400 }}
        className="cell small-12 medium-6 container-4"
      ></div>
      <div style={{ height: 400, width: 400 }} className="cell small-12 medium-6 container-4">
        <ResultList searchResults={searchResults} />
      </div>
    </div>
  );
};

export default ActivitiesAroundMeMap;
