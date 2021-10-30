import { TAppState, TFormValues } from "../../store/store.types";

export type TStepComponent = {
  state: TAppState;
  getData: (id: string) => Promise<void>;
  resetHandle: (fields: (keyof TFormValues)[] | undefined) => void;
}