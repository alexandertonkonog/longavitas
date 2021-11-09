import { TActionCreator, TApiPayload } from "./store.types";
import { ActionTypes } from "./store.constants";

export const setLoadingAC: TActionCreator<boolean> = (payload) => {
  return {type: ActionTypes.SET_LOADING, payload};
}
export const setDataAC: TActionCreator<TApiPayload> = (payload) => {
  return {type: ActionTypes.SET_DATA, payload};
}
export const setWidthAC: TActionCreator<number> = (payload) => {
  return {type: ActionTypes.SET_WIDTH, payload};
}
export const setAppointmentDataAC: TActionCreator<any> = (payload) => {
  return {type: ActionTypes.SET_APPOINTMENT_DATA, payload};
}