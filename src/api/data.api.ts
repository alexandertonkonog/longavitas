import API from './index';

import { TApiPayload } from "../store/store.types";
import { getISODate } from "../utils/index.util";

export const getData = async (date: Date | undefined = undefined): Promise<TApiPayload> => {
  const startDate = getISODate(date ? new Date(date) : new Date());
  return API.get({startDate});
}