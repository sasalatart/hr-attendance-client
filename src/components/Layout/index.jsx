import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper } from '@material-ui/core';
import { Background } from '../Common';
import Header from './Header';

const useStyles = makeStyles({
  contentWrapper: {
    flex: 1,
    marginTop: '25px',
    marginBottom: '25px',
  },
  children: {
    height: '100%',
    padding: '10px',
  },
});

// TODO: Add footer
export default function CustomLayout({ children }) {
  const classes = useStyles();

  return (
    <>
      <Header />
      <Background>
        <Container className={classes.contentWrapper} maxWidth="lg">
          <Paper className={classes.children}>{children}</Paper>
        </Container>
        <span />
      </Background>
    </>
  );
}

CustomLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};
