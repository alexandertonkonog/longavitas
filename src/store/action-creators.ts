import { TAction, TActionCreator, TAppState, TClinicItem } from "./store.types";
import { ActionTypes } from "./store.constants";

export const setClinicAC: TActionCreator<TClinicItem[]> = (payload) => {
  return {type: ActionTypes.SET_CLINICS, payload};
}
export const setLoadingAC: TActionCreator<boolean> = (payload) => {
  return {type: ActionTypes.SET_LOADING, payload};
}
export const setDataAC: TActionCreator<Partial<TAppState>> = (payload) => {
  return {type: ActionTypes.SET_DATA, payload};
}