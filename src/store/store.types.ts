import { TCalendarTimeItem } from "../components/fields/input.types";

export type TFormValues = {
  doctor: string;
  specialization: string;
  clinic: string;
  date: TCalendarTimeItem;
  name: string;
  surname: string;
  number: string;
  confirm: boolean;
  address?: string;
  comment?: string;
}

export type TAction<Payload> = {
  type: string;
  payload: Payload;
}

export type TClinicItem = {
  id: string;
  name: string;
}

export type TDoctorItem = {
  id: string;
  name: string;
  clinic: string;
  duration: number;
  specialization: string;
}

export type TTimeItem = {
  timeStart: string;
  timeEnd: string;
}

export type TScheduleItem = {
  doctor: string;
  specialization: string;
  clinic: string;
  time: TTimeItem[];
}

export type TDoctorPayloadItem = {
  clinic: string;
  time: string[][];
  employee: TDoctorItem;
}

export type TApiPayload = {
  clinics: TClinicItem[] | null;
  schedule: TScheduleItem[] | null;
  doctors: TDoctorItem[] | null;
}

export type TAppState = {
  clinics: TClinicItem[] | null;
  schedule: TScheduleItem[] | null;
  loading: boolean;
  specializations: string[] | null;
  doctors: TDoctorItem[] | null;
  screenWidth: number;
  appointment: TFormValues | null;
}

export type TActionCreator<Type> = (payload: Type) => TAction<Type>;