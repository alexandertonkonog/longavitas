import { TFormValues } from "../../store/store.types";

export interface IInput {
  name: string;
  title: string;
  validate?: any;
  disabled?: boolean;
  deps?: (keyof TFormValues)[];
  id?: string | number;
}

export type TSelectItem = {
  id: string | number;
  name: string;
  value: string | number;
}

export interface ISelect extends IInput {
  list?: TSelectItem[];
}