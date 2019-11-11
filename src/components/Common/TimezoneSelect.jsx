import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import Select from 'react-select';
import timezones from '../../lib/timezones';

const options = timezones.map(tzName => ({ value: tzName, label: tzName }));

export default function TimezoneSelect(props) {
  const { t } = useTranslation();
  const { value, className } = props;
  return (
    <div className={className}>
      <Typography variant="inherit">{t('timezone')}</Typography>
      <Select
        {...props}
        options={options}
        placeholder={t('timezone')}
        value={{ value, label: value }}
      />
    </div>
  );
}

TimezoneSelect.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
};

TimezoneSelect.defaultProps = {
  value: undefined,
  className: undefined,
};
