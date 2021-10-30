export type TFormValues = {
  doctor: string;
  specialization: string;
  clinic: string;
  date: Date;
  name: string;
  surname: string;
  number: string;
  confirm: boolean;
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
  spec?: string;
  specialization?: string;
  time?: string[][];
}

export type TDoctorPayloadItem = {
  clinic: string;
  time: string[][];
  employee: TDoctorItem;
}

export type TAppState = {
  clinics: TClinicItem[] | null;
  loading: boolean;
  specializations: string[] | null;
  doctors: TDoctorItem[] | null;
}

export type TActionCreator<Type> = (payload: Type) => TAction<Type>;