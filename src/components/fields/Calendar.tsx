import React, { FC, useState, useMemo } from 'react';
import { Field, useField } from 'react-final-form';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Tooltip,
  FormHelperText
} from "@mui/material";
import { CalendarToday, ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

import { IInput } from "./input.types";
import { DaysOfWeek, Months } from "../Widget/index.constant";
import {
  getDateList,
  getISOTime,
  getTimeByDate, getVisibleDateTime,
  isEqualDate,
  isEqualTime
} from "../../utils/index.util";

type TIconColor = 'inherit' | 'error' | 'disabled';

const Calendar: FC<IInput> = ({ name, title, validate, disabled, state }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const doctor = useField('doctor');
  const time = doctor.input.value
    ? [state?.doctors?.find(doc => doc.id === doctor.input.value)!.time]
    : state?.doctors?.map(item => item.time);
  const dateList = useMemo(() => getDateList(date, time), [doctor.input.value, date]);
  const timeList = useMemo(() => getTimeByDate(selectedDate, time), [selectedDate, doctor.input.value]);

  const changeCalendarVisibility = (val: boolean): void => {
    setIsOpen(val);
  }

  const changeCalendarMonth = (vector: boolean): void => {
    if (vector) {
      setDate(prev => {
        const localDate = new Date(prev);
        localDate.setMonth(prev.getMonth() + 1);
        return localDate;
      })
    } else {
      setDate(prev => {
        const localDate = new Date(prev);
        localDate.setMonth(prev.getMonth() - 1);
        return localDate;
      })
    }
  }

  return (
    <Field name={name} validate={validate}>
      {({input, meta}) => {
        const onChange = (date: Date) => {
          input.onChange(date);
          setIsOpen(false);
        }
        const value = getVisibleDateTime(input.value);
        let color: TIconColor = 'inherit';
        if (meta.touched && meta.error) color = 'error';
        if (disabled) color = 'disabled';
        return (
          <>
            <Tooltip title={disabled ? 'Заполните предыдущие поля' : ''}>
              <FormControl variant="outlined">
                <InputLabel
                  className={!disabled && meta.touched && meta.error && 'UMC-widget-input-error'}
                  htmlFor="date">
                  {title}
                </InputLabel>
                <OutlinedInput
                  error={!!(meta.touched && meta.error)}
                  onFocus={() => changeCalendarVisibility(true)}
                  id="date"
                  type={'text'}
                  value={value}
                  onChange={() => console.log(input.value)}
                  disabled={disabled}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        disabled={disabled}
                        onClick={() => changeCalendarVisibility(true)}
                        edge="end"
                      >
                        <CalendarToday color={color} />
                      </IconButton>
                    </InputAdornment>
                  }
                  label={title}
                />
                {!disabled && meta.touched && meta.error
                  && <FormHelperText
                      className={'UMC-widget-input-error'}>
                    {meta.error}
                  </FormHelperText>}
              </FormControl>
            </Tooltip>
            <Dialog
              onClose={() => changeCalendarVisibility(false)}
              open={isOpen}
              disableRestoreFocus
            >
              <div className={'UMC-widget-calendar-wrapper'}>
                <DialogTitle>
                  <div className={'UMC-widget-calendar-header'}>
                    <IconButton onClick={() => changeCalendarMonth(false)}>
                      <ArrowBackIosNew />
                    </IconButton>
                    <div className={'UMC-widget-calendar-header__text UMC-widget-title'}>
                      {Months[date.getMonth()]} {date.getFullYear()}
                    </div>
                    <IconButton onClick={() => changeCalendarMonth(true)}>
                      <ArrowForwardIos />
                    </IconButton>
                  </div>
                </DialogTitle>
                <DialogContent>
                  <div className="UMC-widget-calendar-block">
                    <div className={'UMC-widget-calendar__header UMC-widget-calendar__grid'}>
                      {DaysOfWeek.map(item => (
                        <div key={item} className={'UMC-widget-calendar__box UMC-widget-calendar__box_header'}>{item}</div>
                      ))}
                    </div>
                    <div className={'UMC-widget-calendar__grid'}>
                      {dateList.map(item => {
                        const thisDate = new Date(date);
                        thisDate.setDate(item.name);
                        const isToday = isEqualDate(thisDate);
                        const isValue = isEqualDate(thisDate, selectedDate);
                        if (isValue) {
                          return (
                            <div key={item.name} className={'UMC-widget-calendar__box UMC-widget-calendar__box_selected'}>
                              {item.name}
                            </div>
                          );
                        }
                        if (item.free) {
                          return (
                            <div
                              key={item.name}
                              className={'UMC-widget-calendar__box UMC-widget-calendar__box_free'}
                              onClick={() => setSelectedDate(thisDate)}>
                              {item.name}
                            </div>
                          );
                        }
                        if (!item.empty) {
                          return (
                            <div key={item.name}
                              className={isToday
                                ? 'UMC-widget-calendar__box UMC-widget-calendar__box_busy UMC-widget-calendar__box_outlined'
                                : 'UMC-widget-calendar__box UMC-widget-calendar__box_busy'}
                            >
                              {item.name}
                            </div>
                          );
                        }
                        return <p key={item.name}></p>;
                      })}
                    </div>
                  </div>
                  {selectedDate && <div className={'UMC-widget-time-block'}>
                    <div className={'UMC-widget-title UMC-widget-time__title'}>Время приема:</div>
                    <div className={'UMC-widget-time'}>
                      {timeList.map(item => (
                        <time
                          key={item.toDateString()}
                          onClick={() => onChange(item)}
                          className={isEqualTime(item, input.value)
                            ? 'UMC-widget-time__box UMC-widget-time__box_selected'
                            : 'UMC-widget-time__box'}>
                          {getISOTime(item)}
                        </time>
                      ))}
                    </div>
                  </div>}
                </DialogContent>
              </div>
            </Dialog>
          </>
        );
      }}
    </Field>
  );
};

export default Calendar;