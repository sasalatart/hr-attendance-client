import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { formatStamp } from '../../../lib/date-fns';

export default function AttendanceItemStamps({ enteredAt, leftAt, timezone }) {
  const { t } = useTranslation();

  const from = t('attendances.enteredAtStamp', {
    enteredAt: formatStamp(enteredAt, timezone, 'Pp'),
  });

  if (!leftAt) return from;

  const to = t('attendances.leftAtStamp', {
    leftAt: formatStamp(leftAt, timezone, 'Pp'),
  });

  return (
    <>
      {from}
      <br />
      {to}
    </>
  );
}

AttendanceItemStamps.propTypes = {
  enteredAt: PropTypes.string.isRequired,
  leftAt: PropTypes.string,
  timezone: PropTypes.string.isRequired,
};

AttendanceItemStamps.defaultProps = {
  leftAt: undefined,
};
