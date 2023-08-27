import React, { useState } from "react";
import { Input, InputGroup, InputRightElement, Button, Center } from "@chakra-ui/react";

const ActivitySearchBar = (props) => {
    const [searchInput, setSearchInput] = useState({
        name: "",
    });
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const handleChange = (event) => {
        setSearchInput({
            ...searchInput,
            name: event.currentTarget.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setShouldRedirect(true);
    };

    if (shouldRedirect) {
        window.location.href = `/activity/${searchInput.name}`;
    }
    return (
        <Center bg="tomato" h="50px" color="white">
            This is the Center
            <form onSubmit={handleSubmit}>
                <label htmlFor="search-bar">
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            bg="whiteAlpha.100"
                            type="text"
                            placeholder="Type new activity"
                            onChange={handleChange}
                            value={searchInput.name}
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
                                backgroundColor="whiteAlpha.400"
                            >
                                Search
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </label>
                {/* {error ? <p>Please enter a valid city!</p> : null} */}
            </form>
        </Center>
    );
};

export default ActivitySearchBar;
