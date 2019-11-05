import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '15px 0',
  },
});

export default function Title({ text, textId, children }) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h3">{text || t(textId)}</Typography>
      <div>{children}</div>
    </div>
  );
}

Title.propTypes = {
  text: PropTypes.string,
  textId: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Title.defaultProps = {
  text: undefined,
  textId: undefined,
  children: undefined,
};
