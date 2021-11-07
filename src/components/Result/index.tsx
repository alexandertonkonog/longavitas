import React, { FC } from 'react';
import { Button, DialogActions, DialogContent, Grid, Typography } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { TAppState } from "../../store/store.types";
import { useHistory, useParams } from "react-router-dom";
import { getVisibleDateTime } from "../../utils/index.util";

type TResult = {
  state: TAppState;
}

type TResultParam = {
  status: 'success' | 'error';
}

const getResultText = (state: TAppState): string => {
  if (!state.appointment || !state.doctors || !state.clinics) return '';
  const doctor = state.doctors.find(item => item.id === state?.appointment?.doctor);
  const clinic = state.clinics.find(item => item.id === state?.appointment?.clinic);
  const date = getVisibleDateTime(state.appointment.date.date);
  return `Вы записаны на прием к доктору ${doctor?.name} на ${date} в клинику ${clinic?.name}`;
}

const Result: FC<TResult> = (props) => {
  const params = useParams<TResultParam>();
  const history = useHistory();
  const isError = params.status === 'error';
  const title = isError ? 'Произошла ошибка!' : 'Запись выполнена';
  const text = isError
    ? 'Возникла ошибка при работе виджета записи. Попробуйте еще раз или зайдите позднее'
    : getResultText(props.state);
  const Icon = isError ? ErrorOutlineIcon : CheckCircleOutlineIcon;
  return (
    <>
      <DialogContent>
        <Grid container style={{marginTop: 40}}>
          <Grid item xs={2}>
            <Icon fontSize={'large'} color={isError ? 'error' : 'primary'} />
          </Grid>
          <Grid item xs={10}>
            <Typography style={{marginBottom: 20}} variant="h5">{title}</Typography>
            <Typography>{text}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {isError
          ? <Button onClick={() => history.push('/appointment')}>
            Попробовать еще раз
          </Button>
          : <Button onClick={() => history.push('/')}>
            Хорошо
          </Button>
        }
      </DialogActions>
    </>
  );
};

export default Result;