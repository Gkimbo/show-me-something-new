import React, { useState } from "react";
import GetDestination from "../services/GetDestination";

const LocationSearchBar = ({ setChosenLocation }) => {
    const [searchBarInput, setSearchBarInput] = useState("");
    const [error, setError] = useState(false);

    const handleChange = (event) => {
        setSearchBarInput(event.currentTarget.value);
    };

    const handelSubmit = async (event) => {
        event.preventDefault();
        const newLocation = await GetDestination.getChosenDestination(searchBarInput);
        if (!newLocation) {
            setError(true);
        } else {
            setError(false);
            setChosenLocation({
                lat: newLocation.latitude,
                lng: newLocation.longitude,
            });
            setSearchBarInput("");
        }
    };
    return (
        <form onSubmit={handelSubmit}>
            <label htmlFor="search-bar">
                Type in a city you'd like to see!
                <input
                    type="text"
                    name="search-bar"
                    className="search-bar"
                    value={searchBarInput}
                    placeholder="Boston"
                    onChange={handleChange}
                />
            </label>
            {error ? <p>Please enter a valid city!</p> : null}
            <input type="submit" className="button-1" />
        </form>
    );
};

export default LocationSearchBar;
