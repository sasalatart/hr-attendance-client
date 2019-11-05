import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    backgroundColor: blue[500],
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  columns: {
    flexDirection: 'column',
    minHeight: 'calc(100vh - 64px)',
  },
});

export default function Background({ centered, children }) {
  const classes = useStyles();
  return (
    <div
      className={classnames(
        classes.container,
        centered ? classes.centered : classes.columns,
      )}
    >
      {children}
    </div>
  );
}

Background.propTypes = {
  centered: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Background.defaultProps = {
  centered: false,
};
