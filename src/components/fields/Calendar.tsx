import React, { FC, useState, useMemo } from 'react';
import { Field, useField } from 'react-final-form';
import 'moment/locale/ru'

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
  Box, Button
} from "@mui/material";
import { CalendarToday, ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

import { IInput } from "./input.types";
import { DaysOfWeek, Months } from "../Widget/index.constant";
import { getDateList, isEqualDate } from "../../utils/index.util";
import { TButtonVariant } from "../Widget/index.types";

const Calendar: FC<IInput> = ({ name, title, validate, disabled, state }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const doctor = useField('doctor');
  const time = doctor.input.value
    ? [state?.doctors?.find(doc => doc.id === doctor.input.value)!.time]
    : state?.doctors?.map(item => item.time);
  const dateList = useMemo(() => getDateList(date, time), [doctor.input.value, date]);

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
        return (
          <>
            <Tooltip placement={'right'} title={disabled ? 'Заполните предыдущие поля' : ''}>
              <FormControl variant="outlined">
                <InputLabel htmlFor="date">{title}</InputLabel>
                <OutlinedInput
                  onFocus={() => changeCalendarVisibility(true)}
                  id="date"
                  type={'text'}
                  value={input.value}
                  disabled={disabled}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        disabled={disabled}
                        onClick={() => changeCalendarVisibility(true)}
                        edge="end"
                      >
                        <CalendarToday />
                      </IconButton>
                    </InputAdornment>
                  }
                  label={title}
                />
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
                    <div className={'UMC-widget-calendar-header__text'}>
                      {Months[date.getMonth()]} {date.getFullYear()}
                    </div>
                    <IconButton onClick={() => changeCalendarMonth(true)}>
                      <ArrowForwardIos />
                    </IconButton>
                  </div>
                </DialogTitle>
                <DialogContent>
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
                      let variant: TButtonVariant = 'text';
                      if (isToday) variant = 'outlined';
                      if (isValue) {
                        return (
                          <div key={item.name} className={'UMC-widget-calendar__box UMC-widget-calendar__box_selected'}>
                            {item.name}
                          </div>
                        );
                      }
                      if (item.free) {
                        return (
                          <div className={'UMC-widget-calendar__box'}>
                            <Button
                              onClick={() => setSelectedDate(thisDate)}
                              variant={variant}
                              size="small"
                              className={'UMC-widget-calendar__box'}
                              key={item.name}
                              type="submit">
                              {item.name}
                            </Button>
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
                      return <p></p>;
                    })}
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