import { TAppState, TFormValues } from "../../store/store.types";

export interface IInput {
  name: string;
  title: string;
  validate?: any;
  disabled?: boolean;
  visibility?: boolean;
  visibleName?: string;
  mask?: any;
  deps?: (keyof TFormValues)[];
  id?: string | number;
  order?: number;
  type: 'select' | 'input' | 'date' | 'checkbox';
}

export type TSelectItem = {
  id: string | number;
  name: string;
  value: string | number;
}

export interface ISelect extends IInput {
  list?: TSelectItem[];
  resetHandle?: (fields: (keyof TFormValues)[] | undefined) => void;
  resetDeps?: (keyof TFormValues)[];
}

export interface ICalendar extends IInput {
  state: TAppState;
  values: TFormValues;
}

export type TCalendarItem = {
  date: Date;
  time: TCalendarTimeItem[];
}

export type TCalendarTimeItem = {
  time: string;
  date: Date;
  doctors: string[];
}