import API from './index';
import moment from "moment";

import { TClinicItem, TDoctorPayloadItem } from "../store/store.types";
import { getISODate } from "../utils/index.util";

export const getClinics = async (): Promise<TClinicItem[]> => {
  return API.get({type: 'clinic'});
}

export const getOtherData = async (clinicId: string): Promise<TDoctorPayloadItem[]> => {
  const startDate = moment(new Date()).format('YYYY-MM-DDTHH:mm:00');
  return API.get({type: 'time', clinicId, startDate});
}