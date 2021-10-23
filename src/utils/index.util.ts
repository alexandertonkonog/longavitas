import { TSelectItem } from "../components/fields/input.types";
import { TClinicItem } from "../store/store.types";

export const mapStateToSelectList = <Type extends TClinicItem | string>(list: Type[]): TSelectItem[] | [] => {
  return list.map(item => {
    return typeof item === 'string'
      ? {id: item, value: item, name: item}
      : {id: item.id, value: item.id, name: item.name};
  });
}

export const getStartNull = (num: number): string => {
  if (num < 10) {
    return '0' + num;
  }
  return String(num);
}

export const getISODate = (date: Date): string => {
  return date.getFullYear() + '-'
    + getStartNull(date.getMonth() + 1) + '-'
    + getStartNull(date.getDate()) + 'T'
    + getStartNull(date.getHours()) + ':'
    + getStartNull(date.getMinutes()) + ':00';
}