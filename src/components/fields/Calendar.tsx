import React, { FC, useState, useMemo } from 'react';
import { Field, useForm } from 'react-final-form';

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
import { CalendarToday, ArrowBackIosNew, ArrowForwardIos, Close } from '@mui/icons-material';

import { ICalendar, TCalendarTimeItem } from "./input.types";
import {
  getDateForCalendarTitle,
  getDateList,
  getVisibleDateTime,
} from "../../utils/index.util";

type TIconColor = 'inherit' | 'error' | 'disabled';
const now = new Date();
const nowPlusMonth = new Date(now);
nowPlusMonth.setMonth(nowPlusMonth.getMonth() + 1);

const Calendar: FC<ICalendar> = (
  { name, title, validate, disabled, state, values }
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(now);
  const dateList = useMemo(() => getDateList(date, state, values), [values.doctor, date, values.specialization]);
  const form = useForm();

  const changeCalendarVisibility = (val: boolean): void => {
    setIsOpen(val);
  }

  const changeCalendarMonth = (vector: boolean): void => {
    if (vector) {
      setDate(prev => {
        const localDate = new Date(prev);
        localDate.setDate(prev.getDate() + 5);
        return localDate;
      })
    } else {
      setDate(prev => {
        const localDate = new Date(prev);
        localDate.setDate(prev.getDate() - 5);
        if (now > localDate) {
          return now;
        }
        return localDate;
      })
    }
  }

  return (
    <Field name={name} validate={validate}>
      {({input, meta}) => {
        const onChange = (date: TCalendarTimeItem) => {
          input.onChange(date);
          if (date.doctors.length === 1) {
            form.change('doctor', date.doctors[0]);
          }
          setIsOpen(false);
        }
        const value = getVisibleDateTime(input.value.date);
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
              fullScreen={state.screenWidth <= 768}
              PaperProps={{
                style: {
                  maxWidth: state.screenWidth <= 768 ? '100vw' : '95vw',
                }
              }}
              onClose={() => changeCalendarVisibility(false)}
              open={isOpen}
              disableRestoreFocus
            >
              <div className={'UMC-widget-calendar-wrapper'}>
                <DialogTitle>
                  <div className={'UMC-widget-calendar-header'}>
                    <IconButton
                      disabled={now >= date}
                      onClick={() => changeCalendarMonth(false)}
                      size={state.screenWidth < 450 ? 'small' : 'medium'}
                    >
                      <ArrowBackIosNew />
                    </IconButton>
                    <div className={'UMC-widget-calendar-header__text UMC-widget-title'}>
                      {getDateForCalendarTitle(date)}
                    </div>
                    <IconButton
                      disabled={date >= nowPlusMonth}
                      onClick={() => changeCalendarMonth(true)}
                      size={state.screenWidth < 450 ? 'small' : 'medium'}
                    >
                      <ArrowForwardIos />
                    </IconButton>
                  </div>
                  <IconButton
                    className={'UMC-widget__btn-exit'}
                    onClick={() => changeCalendarVisibility(false)}
                  >
                    <Close />
                  </IconButton>
                </DialogTitle>
                <DialogContent>
                  <div className="UMC-widget-calendar-block">
                    <div className={'UMC-widget-calendar__grid'}>
                      {dateList?.map(item => (
                        <div key={item.date.getTime()} className={'UMC-widget-calendar__column'}>
                          <h3 className={item.time.length
                            ? 'UMC-widget-calendar__column-title'
                            : 'UMC-widget-calendar__column-text_grey UMC-widget-calendar__column-title'}>
                            {getDateForCalendarTitle(item.date)}
                          </h3>
                          <div className="UMC-widget-calendar__column-content">
                            {item.time.length
                              ? item.time.map((time, timeIndex) => (
                                <p
                                  key={item.date.getTime() + timeIndex}
                                  onClick={() => onChange(time)}
                                  className={'UMC-widget-calendar__box UMC-widget-calendar__box_free'}>{time.time}</p>
                              ))
                              : <p className={'UMC-widget-calendar__column-text UMC-widget-calendar__column-text_grey'}>
                                Нет времени для записи
                              </p>
                            }
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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