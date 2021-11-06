import { TSelectItem, TCalendarItem, TCalendarTimeItem } from "../components/fields/input.types";
import { TAppState, TClinicItem, TDoctorItem, TFormValues, TScheduleItem } from "../store/store.types";
import { DaysOfWeek, Months } from "../components/Widget/index.constant";

export const mapStateToSelectList = <Type extends TClinicItem | TDoctorItem>(list: Type[] | null | undefined): TSelectItem[] | [] => {
  if (!list) return [];
  return list.map(item => {
    return {id: item.id, value: item.id, name: item.name};
  });
};

export const mapSpecializationsToSelectList = (list: TScheduleItem[] | null | undefined): TSelectItem[] | [] => {
  if (!list) return [];
  const specializations = Array.from(
    new Set(list.filter(item => item.specialization).map(item => item.specialization))
  );
  return specializations.map(item => (
    {id: item, value: item, name: item}
  ));
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

export const getISOTime = (date: Date): string => {
  return getStartNull(date.getHours()) + ':'
    + getStartNull(date.getMinutes());
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

export const getDateList = (
  date: Date,
  state: TAppState,
  { doctor, specialization }: TFormValues
): TCalendarItem[] | null => {
  if (!specialization) {
    return null;
  }
  const schedule = doctor
    ? state.schedule?.filter(item => item.doctor === doctor)
    : state.schedule?.filter(item => item.specialization === specialization);

  let count = 0;
  const localDate = new Date(date);
  const result: TCalendarItem[] = [];
  while(count < 5) {
    const dateItem: TCalendarItem = {
      date: new Date(localDate),
      time: []
    };

    schedule!.forEach(item => {
      const doctorItem = state.doctors!.find(doc => doc.id === item.doctor);
      const duration = doctorItem!.duration;
      item.time.forEach(time => {
        const startTime = new Date(time.timeStart);
        if (isEqualDate(startTime, localDate)) {
          const endTime = new Date(time.timeEnd);
          while (startTime < endTime) {
            const thisDate = new Date(startTime);
            const thisDateStr = getVisibleTime(thisDate);
            startTime.setMinutes(startTime.getMinutes() + duration);
            if (startTime <= endTime) {
              const indexElem = dateItem.time.findIndex(elem => elem.time === thisDateStr);
              if (indexElem >= 0) {
                dateItem.time[indexElem].doctors.push(doctorItem!.id);
              } else {
                const timeItem: TCalendarTimeItem = {
                  date: thisDate,
                  time: thisDateStr,
                  doctors: [doctorItem!.id],
                };
                dateItem.time.push(timeItem);
              }
            }
          }
        }
      })
    })
    localDate.setDate(localDate.getDate() + 1);
    result.push(dateItem);
    count++;
  }
  return result
    // .filter(item => item.time.length);
}

// const getTimeItems = (): TCalendarTimeItem => {
//
// }

export const isEqualDate = (first: Date | null, second: Date | null = now): boolean => {
  if (!first || !second) return false;
  return first.getDate() === second.getDate()
    && first.getMonth() === second.getMonth()
    && first.getFullYear() === second.getFullYear();
}

export const isEqualTime = (first: Date | null, second: Date | null = now): boolean => {
  if (!first || !second) return false;
  return first.getHours() === second.getHours()
    && first.getMinutes() === second.getMinutes();
}

export const getTimeByDate = (date: Date | null, time: (string[][] | undefined)[] | undefined): Date[] => {
  if (!time || !date) return [];
  const result: Date[] = [];
  time.forEach(item => {
    item?.forEach(elem => {
      elem.forEach(dateStr => {
        const thisDate = new Date(dateStr);
        if (isEqualDate(thisDate, date)) {
          result.push(thisDate);
        }
      })
    });
  });
  return Array.from(new Set(result));
}

export const getVisibleDate = (date: Date | null): string => {
  if (!date) return '';
  return getStartNull(date.getDate()) + '.'
    + getStartNull(date.getMonth() + 1) + '.'
    + date.getFullYear();
}

export const getVisibleTime = (date: Date | null): string => {
  if (!date) return '';
  return getStartNull(date.getHours()) + ':'
    + getStartNull(date.getMinutes());
}

export const getVisibleDateTime = (date: Date | null): string => {
  if (!date) return '';
  return getVisibleDate(date) + ' ' + getVisibleTime(date);
}

export const getDateForCalendarTitle = (date: Date | null): string => {
  if (!date) return '';
  return `${DaysOfWeek[date.getDay()]}, ${date.getDate()} ${getMonthGenitive(date.getMonth())}`;
}

export const getMonthGenitive = (month: number): string => {
  const monthName = Months[month];
  if (month === 2) {
    return monthName + 'а';
  }
  const lastChar = monthName[monthName.length - 1];
  return monthName.replace(lastChar, 'я');
}