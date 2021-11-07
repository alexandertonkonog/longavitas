import { Reducer } from "react";

import { TAction, TAppState } from "./store.types";
import { ActionTypes } from "./store.constants";

export const initialState: TAppState = {
  clinics: null,
  schedule: null,
  loading: false,
  doctors: null,
  specializations: null,
  screenWidth: document.documentElement.clientWidth,
  appointment: null,
}

export const rootReducer: Reducer<TAppState, TAction<any>> = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING: {
      return {...state, loading: action.payload};
    }
    case ActionTypes.SET_DATA: {
      return {
        ...state,
        clinics: action.payload.clinics,
        schedule: action.payload.schedule,
        doctors: action.payload.doctors,
        specializations: action.payload.specializations
      };
    }
    case ActionTypes.SET_WIDTH: {
      return {
        ...state,
        screenWidth: action.payload
      };
    }
    case ActionTypes.SET_APPOINTMENT_DATA: {
      return {
        ...state,
        appointment: action.payload
      };
    }
    default: {
      return state;
    }
  }
}