import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { useSession } from '../../hooks';

const useStyles = makeStyles({
  container: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
});

export default function Header() {
  const { t } = useTranslation();
  const classes = useStyles();
  const { logOut } = useSession();

  return (
    <div className={classes.container}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {t('appName')}
          </Typography>
          <Button color="inherit" onClick={logOut}>
            {t('sessions.logOut')}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
