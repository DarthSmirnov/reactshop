import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import withWidth from '@material-ui/core/withWidth';
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';

import Header from './Header';
import Footer from './Footer';
import { Grid, Container } from '@material-ui/core';
import Sidebar from './Sidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  toolbar: theme.mixins.toolbar,
}));

const Layout = (props) => {
  const classes = useStyles();
  const [menu_is_open, setMenuIsOpen] = React.useState(false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const toggleMenu = () => {
    setMenuIsOpen(!menu_is_open);
  };

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Header onToggleSidebar={toggleMenu} />
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Sidebar open={menu_is_open} onClose={toggleMenu} />
            <Grid item xs={12} sm={9}>
              {props.children}
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default withWidth()(Layout);
