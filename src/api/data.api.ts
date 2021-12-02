import API from './index';

import { TApiPayload } from "../store/store.types";

export const getData = async (date: Date | undefined = undefined): Promise<TApiPayload | undefined> => {
  return API.get();
}

export const setAppointment = async (values: {[key: string]: string | number | boolean}): Promise<any> => {
  return API.post(values);
}