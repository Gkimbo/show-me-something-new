const reducer = (state, action) => {
    console.log(action);
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
        default:
            throw new Error();
    }
};

export default reducer;
