import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { formatStamp } from '../../../lib/date-fns';

const useStyles = makeStyles({
  stampsContainer: {
    margin: '25px 0',
  },
});

export default function AttendanceStamps({ enteredAt, leftAt, timezone }) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.stampsContainer}>
      <Typography variant="h5" align="center">
        {t('attendances.enteredAtStamp', {
          enteredAt: formatStamp(enteredAt, timezone),
        })}
      </Typography>
      {leftAt && (
        <Typography variant="h5" align="center">
          {t('attendances.leftAtStamp', {
            leftAt: formatStamp(leftAt, timezone),
          })}
        </Typography>
      )}
      <Typography variant="h6" align="center">
        {timezone}
      </Typography>
    </div>
  );
}

AttendanceStamps.propTypes = {
  enteredAt: PropTypes.string.isRequired,
  leftAt: PropTypes.string,
  timezone: PropTypes.string,
};

AttendanceStamps.defaultProps = {
  leftAt: undefined,
  timezone: undefined,
};
