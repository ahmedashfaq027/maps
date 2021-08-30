import React, { createContext, useContext, useReducer } from "react";

const StateContext = createContext();

const StateProvider = ({ children, initialState, reducer }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

const useStateValue = () => useContext(StateContext);

export { StateContext, StateProvider, useStateValue };
