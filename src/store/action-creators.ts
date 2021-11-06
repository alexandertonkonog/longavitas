import { TActionCreator, TApiPayload } from "./store.types";
import { ActionTypes } from "./store.constants";

export const setLoadingAC: TActionCreator<boolean> = (payload) => {
  return {type: ActionTypes.SET_LOADING, payload};
}
export const setDataAC: TActionCreator<TApiPayload> = (payload) => {
  return {type: ActionTypes.SET_DATA, payload};
}