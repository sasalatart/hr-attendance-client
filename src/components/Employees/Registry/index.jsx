import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import isToday from 'date-fns/isToday';
import parseISO from 'date-fns/parseISO';
import { useActOnResource, useSession } from '../../../hooks';
import { compiledRoutes } from '../../../routes';
import { checkIn, checkOut } from '../../../store/ducks/attendances';
import { loadProfile } from '../../../store/ducks/sessions';
import { LoadingButton, Title } from '../../Common';
import AttendanceStamps from './Stamps';

const useStyles = makeStyles({
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
});

export default function AttendanceRegistry() {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    currentUser: { id, lastAttendance },
  } = useSession();

  const { enteredAt, leftAt } = lastAttendance || {};

  const handleLoadProfile = useCallback(() => dispatch(loadProfile()), [
    dispatch,
  ]);

  const [checkInLoading, handleCheckIn] = useActOnResource(
    useCallback(() => dispatch(checkIn()).then(handleLoadProfile), [
      dispatch,
      handleLoadProfile,
    ]),
  );

  const [checkOutLoading, handleCheckOut] = useActOnResource(
    useCallback(() => dispatch(checkOut()).then(handleLoadProfile), [
      dispatch,
      handleLoadProfile,
    ]),
  );

  return (
    <>
      <Title textId="attendances.registry.word">
        <Button
          to={compiledRoutes.employeesAttendances({ employeeId: id })}
          color="primary"
          component={Link}
        >
          {t('attendances.mine')}
        </Button>
      </Title>
      {(enteredAt || leftAt) && (
        <AttendanceStamps enteredAt={enteredAt} leftAt={leftAt} />
      )}
      <div className={classes.buttonsContainer}>
        <LoadingButton
          color="primary"
          size="large"
          loading={checkInLoading}
          disabled={!leftAt || isToday(parseISO(leftAt))}
          onClick={handleCheckIn}
        >
          {t('attendances.registry.checkIn')}
        </LoadingButton>
        <LoadingButton
          color="primary"
          size="large"
          loading={checkOutLoading}
          disabled={!!leftAt}
          onClick={handleCheckOut}
        >
          {t('attendances.registry.checkIn')}
        </LoadingButton>
      </div>
    </>
  );
}
