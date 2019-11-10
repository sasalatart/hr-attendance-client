import React from 'react';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';

export default function MUIPickersProvider({ children }) {
  // TODO: sync locale with i18next locale
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
      {children}
    </MuiPickersUtilsProvider>
  );
}

MUIPickersProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
