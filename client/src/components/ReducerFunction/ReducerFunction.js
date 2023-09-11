const reducer = (state, action) => {
    switch (action.type) {
        case "chosenLocation":
            return { ...state, chosenLocation: { lat: action.lat, lng: action.lng } };
        default:
            throw new Error();
    }
};

export default reducer;
