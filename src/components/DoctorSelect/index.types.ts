import { TAppState, TFormValues } from "../../store/store.types";

export type TStepComponent = {
  state: TAppState;
  resetHandle: (fields: (keyof TFormValues)[] | undefined) => void;
}