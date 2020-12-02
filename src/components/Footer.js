import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Grid, Icon, Typography } from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  footer: {
    marginTop: theme.spacing(5),
    padding: `${theme.spacing(3)}px 0px`,
  },
  siteName: {
    display: 'block',
    textDecoration: 'none',
    color: 'inherit',
  },
  logo: {
    verticalAlign: 'middle',
  },
  paddingLeft: {
    paddingLeft: theme.spacing(1),
  },
}));

const menu = {
  title: 'Company',
  description: ['Team', 'History', 'Contact us', 'Locations'],
};

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}>
            <Link to="/" className={classes.siteName}>
              <Typography variant="h6" color="inherit" noWrap gutterBottom>
                <img
                  src={logo}
                  height="30"
                  alt="logo"
                  className={classes.logo}
                />
                ReactShop
              </Typography>
            </Link>
            <Box display="flex" flexDirection="column">
              <MuiLink
                color="textPrimary"
                href="tel:+7 (978) 000-00-00"
                className={classes.paddingLeft}
              >
                +7 (978) 000-00-00
              </MuiLink>
              <MuiLink
                color="textPrimary"
                href="mailto:email@example.com"
                className={classes.paddingLeft}
              >
                email@example.com
              </MuiLink>
            </Box>
            <Box display="flex" flexDirection="row" className="soc-network">
              <IconButton color="inherit" href="//facebook.com" target="_blank">
                <FacebookIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="//instagram.com"
                target="_blank"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" href="//linkedin.com" target="_blank">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              {menu.title}
            </Typography>
            <ul>
              {menu.description.map((item) => (
                <li key={item}>
                  <MuiLink href="#" variant="subtitle1" color="textSecondary">
                    {item}
                  </MuiLink>
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Newsletter subscription
            </Typography>
            <Typography variant="body1" gutterBottom>
              Enter your e-mail to be updated with our specials. proposals
            </Typography>
            <form>
              <Grid container alignItems="center" spacing={1}>
                <Grid item xs>
                  <TextField
                    fullWidth
                    size="small"
                    label="Your email"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    endIcon={<Icon>send</Icon>}
                  >
                    Subscribe
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary" align="center">
              {'Copyright © '}
              <MuiLink color="inherit" href="https://material-ui.com/">
                Your Website
              </MuiLink>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
