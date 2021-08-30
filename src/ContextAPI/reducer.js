const initialState = {
    feature: {},
    selectedPolygon: "",
};

const actionTypes = {
    SET_FEATURE: "SET_FEATURE",
    SET_SELECTEDPOLYGON: "SET_SELECTEDPOLYGON",
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_FEATURE":
            return {
                ...state,
                feature: action.feature,
            };
        case "SET_SELECTEDPOLYGON":
            return {
                ...state,
                selectedPolygon: action.selectedPolygon,
            };
        default:
            return state;
    }
};

export default reducer;
export { initialState, actionTypes };
