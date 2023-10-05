const reducer = (state, action) => {
    switch (action.type) {
        case "chosenLocation":
            return {
                ...state,
                chosenLocation: action.chosenLocation,
            };
        case "customActivities":
            return {
                ...state,
                customActivities: action.customActivities,
            };
        case "searchResults":
            return {
                ...state,
                searchResults: action.searchResults(state.searchResults),
            };
        case "selectedMarker":
            return {
                ...state,
                selectedMarker: action.selectedMarker,
            };
        case "openInfoWindow":
            return {
                ...state,
                openInfoWindow: action.openInfoWindow,
            };
        case "selectedActivity":
            return {
                ...state,
                selectedActivity: action.selectedActivity,
            };
        case "selectedPlaceName":
            return {
                ...state,
                selectedPlaceName: action.selectedPlaceName,
            };
        case "modeOfTransportation":
            return {
                ...state,
                modeOfTransportation: action.transportation,
            };
        case "error":
            return {
                ...state,
                error: action.error,
            };
        default:
            throw new Error();
    }
};

export default reducer;
