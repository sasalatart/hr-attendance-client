import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { useActOnResource, useSession } from '../../hooks';
import { checkIn, checkOut } from '../../store/ducks/attendances';
import { loadProfile } from '../../store/ducks/sessions';
import { LoadingButton, Title } from '../Common';
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
    currentUser: { lastAttendance },
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
      <Title textId="attendances.registry.word" />
      {(enteredAt || leftAt) && (
        <AttendanceStamps enteredAt={enteredAt} leftAt={leftAt} />
      )}
      <div className={classes.buttonsContainer}>
        <LoadingButton
          color="primary"
          size="large"
          loading={checkInLoading}
          disabled={!!enteredAt}
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
