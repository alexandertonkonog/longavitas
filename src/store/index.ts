import { Reducer } from "react";

import { TAction, TAppState } from "./store.types";
import { ActionTypes } from "./store.constants";

export const initialState: TAppState = {
  clinics: null,
  loading: false,
  doctors: null,
  specializations: null
}

export const rootReducer: Reducer<TAppState, TAction<any>> = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_CLINICS: {
      return {...state, clinics: action.payload};
    }
    case ActionTypes.SET_LOADING: {
      return {...state, loading: action.payload};
    }
    case ActionTypes.SET_DATA: {
      return {
        ...state,
        doctors: action.payload.doctors,
        specializations: action.payload.specializations
      };
    }
    default: {
      return state;
    }
  }
}