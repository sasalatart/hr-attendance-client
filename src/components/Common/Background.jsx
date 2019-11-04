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
  singleChild: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  multipleChildren: {
    flexDirection: 'column',
    minHeight: 'calc(100vh - 64px)',
  },
});

export default function Background({ children }) {
  const classes = useStyles();
  return (
    <div
      className={classnames(
        classes.container,
        children.length ? classes.multipleChildren : classes.singleChild,
      )}
    >
      {children}
    </div>
  );
}

Background.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
