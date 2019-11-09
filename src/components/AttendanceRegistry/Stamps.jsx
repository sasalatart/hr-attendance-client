import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { formatStamp } from '../../lib/date-fns';

const useStyles = makeStyles({
  stampsContainer: {
    margin: '25px 0',
  },
});

export default function AttendanceStamps({ enteredAt, leftAt }) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.stampsContainer}>
      {enteredAt && (
        <Typography variant="h5" align="center">
          {t('attendances.enteredAtStamp', {
            enteredAt: formatStamp(enteredAt),
          })}
        </Typography>
      )}
      {leftAt && (
        <Typography variant="h5" align="center">
          {t('attendances.leftAtStamp', {
            leftAt: formatStamp(leftAt),
          })}
        </Typography>
      )}
    </div>
  );
}

AttendanceStamps.propTypes = {
  enteredAt: PropTypes.string,
  leftAt: PropTypes.string,
};

AttendanceStamps.defaultProps = {
  enteredAt: undefined,
  leftAt: undefined,
};
