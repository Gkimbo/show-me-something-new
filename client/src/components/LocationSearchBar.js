import React, { useState } from "react";
import GetDestination from "../services/GetDestination";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";

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
                <InputGroup size="md">
                    <Input
                        pr="4.5rem"
                        type="text"
                        placeholder="Type new city"
                        onChange={handleChange}
                    />
                    <InputRightElement width="4.5rem">
                        <Button
                            type="submit"
                            size="md"
                            height="20px"
                            width="400px"
                            border="1px"
                            borderColor="blue.500"
                            marginRight="1rem"
                        >
                            Search
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </label>
            {error ? <p>Please enter a valid city!</p> : null}
        </form>
    );
};

export default LocationSearchBar;
