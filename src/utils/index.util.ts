import { TSelectItem } from "../components/fields/input.types";
import { TAppState, TClinicItem } from "../store/store.types";
import { TCalendarItem } from "../components/Widget/index.types";

export const mapStateToSelectList = <Type extends TClinicItem | string>(list: Type[]): TSelectItem[] | [] => {
  return list.map(item => {
    return typeof item === 'string'
      ? {id: item, value: item, name: item}
      : {id: item.id, value: item.id, name: item.name};
  });
};

export const getStartNull = (num: number): string => {
  if (num < 10) {
    return '0' + num;
  }
  return String(num);
};

export const getISODate = (date: Date): string => {
  return date.getFullYear() + '-'
    + getStartNull(date.getMonth() + 1) + '-'
    + getStartNull(date.getDate()) + 'T'
    + getStartNull(date.getHours()) + ':'
    + getStartNull(date.getMinutes()) + ':00';
};

const now = new Date();

export const isFreeDate = (time: (string[][] | undefined)[] | undefined) => (date: Date): boolean => {
  if (date < now) return false;
  if (!time) return false;
  return time.some(item => {
    if (!item) return false;
    return item.some(elem => {
      const now = new Date(elem[0]);
      return isEqualDate(date, now);
    });
  })
};

const getEmptyDays = (dayOfWeek: number): TCalendarItem[] => {
  const result = [];
  if (dayOfWeek !== 1) {
    const dateItem: TCalendarItem = {
      name: 0,
      free: false,
      empty: true,
    };
    if (dayOfWeek === 0) {
      for(let i = 0; i < 6; i++) {
        result.push(dateItem);
      }
    } else {
      for(let i = 1; i < dayOfWeek; i++) {
        result.push(dateItem);
      }
    }
  }
  return result;
}

export const getDateList = (date: Date, time: (string[][] | undefined)[] | undefined): TCalendarItem[] => {
  const currentMonth = date.getMonth();
  const localDate = new Date(date);
  const isFreeDateHandle = isFreeDate(time);
  localDate.setDate(1);
  const dayOfWeek = localDate.getDay();
  const result = getEmptyDays(dayOfWeek);
  while(localDate.getMonth() === currentMonth) {
    const dateItem: TCalendarItem = {
      name: localDate.getDate(),
      free: isFreeDateHandle(localDate)
    };
    result.push(dateItem);
    localDate.setDate(localDate.getDate() + 1);
  }
  return result;
}

export const isEqualDate = (first: Date | null, second: Date | null = now): boolean => {
  if (!first || !second) return false;
  return first.getDate() === second.getDate()
    && first.getMonth() === second.getMonth()
    && first.getFullYear() === second.getFullYear();
}
