import React from "react";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@material-ui/core";

const TransitSelectionButton = ({ dispatch }) => {
    const handleChange = (event) => {
        const transportation = event.currentTarget.value;
        dispatch({ type: "modeOfTransportation", transportation: transportation });
    };
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Mode of transportation</FormLabel>
            <RadioGroup row aria-label="position" name="position" defaultValue="top">
                <FormControlLabel
                    value="DRIVING"
                    control={<Radio color="primary" />}
                    label="Drive"
                    labelPlacement="top"
                    onChange={handleChange}
                />
                <FormControlLabel
                    value="WALKING"
                    control={<Radio color="primary" />}
                    label="Walk"
                    labelPlacement="top"
                    onChange={handleChange}
                />
                <FormControlLabel
                    value="BICYCLING"
                    control={<Radio color="primary" />}
                    label="Bike"
                    labelPlacement="top"
                    onChange={handleChange}
                />
            </RadioGroup>
        </FormControl>
    );
};

export default TransitSelectionButton;
