import API from './index';

import { TClinicItem, TDoctorPayloadItem } from "../store/store.types";
import { getISODate } from "../utils/index.util";

export const getClinics = async (): Promise<TClinicItem[]> => {
  return API.get({type: 'clinic'});
}

export const getOtherData = async (clinicId: string): Promise<TDoctorPayloadItem[]> => {
  const startDate = getISODate(new Date());
  return API.get({type: 'time', clinicId, startDate});
}