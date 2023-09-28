import React, { useState } from "react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";

const LocationSearchBar = ({ setMapSearchQuery }) => {
    const [searchBarInput, setSearchBarInput] = useState("");

    const handleChange = (event) => {
        setSearchBarInput(event.currentTarget.value);
    };

    const handelSubmit = (event) => {
        event.preventDefault();
        setMapSearchQuery(searchBarInput);
        setSearchBarInput("");
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
                        value={searchBarInput}
                    />
                    <InputRightElement width="4.5rem">
                        <Button
                            type="submit"
                            size="lg"
                            height="25px"
                            width="600px"
                            border="1px"
                            borderColor="blue.500"
                            marginRight="1rem"
                            fontSize="small"
                            borderRadius="3px"
                        >
                            Search
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </label>
        </form>
    );
};

export default LocationSearchBar;
