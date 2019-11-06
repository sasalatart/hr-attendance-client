import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '15px 0',
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default function Title({ text, textId, children, withBackButton }) {
  const { goBack } = useHistory();
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.textContainer}>
        {withBackButton && (
          <IconButton onClick={goBack}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h3">{text || t(textId)}</Typography>
      </div>
      <div>{children}</div>
    </div>
  );
}

Title.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  text: PropTypes.string,
  textId: PropTypes.string,
  withBackButton: PropTypes.bool,
};

Title.defaultProps = {
  children: undefined,
  text: undefined,
  textId: undefined,
  withBackButton: false,
};
