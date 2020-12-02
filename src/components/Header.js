import React from 'react';
import logo from '../logo.svg';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import GitHubIcon from '@material-ui/icons/GitHub';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(5),
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    display: 'block',
    textDecoration: 'none',
    color: 'inherit',
  },
  spacer: {
    flexGrow: 1,
  },
  logo: {
    verticalAlign: 'middle',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

const Header = (props) => {
  const { cart } = useSelector((state) => state.cart);
  const history = useHistory();
  const classes = useStyles();
  const cartLength = (cart) => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleDrawerToggle = () => {
    props.onToggleSidebar();
  };

  return (
    <AppBar
      color="default"
      position="sticky"
      elevation={0}
      className={classes.root}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="toggle sidebar"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Link to="/" className={classes.toolbarTitle}>
          <Typography variant="h6" color="inherit" noWrap>
            <img src={logo} height="30" alt="logo" className={classes.logo} />
            ReactShop
          </Typography>
        </Link>
        <div className={classes.spacer}></div>
        <IconButton
          aria-label={`show ${cartLength(cart)} items in cart`}
          color="inherit"
          onClick={() => history.push('/cart')}
        >
          <Badge badgeContent={cartLength(cart)} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <IconButton
          aria-label="Github repo"
          color="inherit"
          href="//github.com/DarthSmirnov/vue-shop"
          target="_blank"
        >
          <GitHubIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
