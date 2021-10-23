import { TAppState, TFormValues } from "../../store/store.types";

export type TDoctorSelect = {
  values: TFormValues;
  state: TAppState;
  getData?: (id: string) => Promise<void>
}