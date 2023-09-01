import React, { useContext } from "react";  
export const initialState = {
    loading: false,
    allPlates: [],
    userToken: "",
};

export const ActionTypes = {
    setLoading: "SET_LOADING",
    setPlates: "SET_PLATES",
    setUserToken: "Set_USER_TOKEN", 
};

export const reducer = (state = {}, action) => {
    switch (action.type) {
      case ActionTypes.setLoading: {
        return { ...state, loading: action.newValue };
      }
      case ActionTypes.setPlates: {
        return { ...state, allPlates: action.newValue };
      }
      case ActionTypes.setUserToken: {
        return { ...state, userToken: action.newValue };
      }
      default: {
        return state;
      }
    }
  };