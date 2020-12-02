import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../utils/api';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: {
    ...theme.mixins.toolbar,
    paddingLeft: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  catList: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    height: '100%',
  },
  progress: {
    alignSelf: 'center',
    justifySelf: 'center',
    position: 'absolute',
  },
}));

const SubHeader = ({ hasGutter }) => {
  return (
    <Typography variant="h5" color="textPrimary" gutterBottom={hasGutter}>
      Categories
    </Typography>
  );
};
SubHeader.propTypes = {
  hasGutter: PropTypes.bool,
};

const CategoriesList = ({ isMobile }) => {
  const classes = useStyles();
  const [categories, setCategories] = React.useState([]);
  React.useEffect(async () => {
    try {
      setCategories((await api.get('/category')).data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className={classes.catList}>
      {categories.length == 0 && (
        <CircularProgress className={classes.progress} />
      )}
      {categories.length > 0 && (
        <List
          subheader={
            isMobile ? (
              <ListSubheader component="div">
                <SubHeader hasGutter={isMobile} />
              </ListSubheader>
            ) : (
              false
            )
          }
        >
          {categories.map((item) => (
            <ListItem
              button
              key={item._id}
              component={Link}
              to={`/category/${item.category_id}`}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};
CategoriesList.propTypes = {
  isMobile: PropTypes.bool,
};

const Sidebar = (props) => {
  const classes = useStyles();

  const { window, open } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const toggleMenu = () => {
    props.onClose();
  };

  return (
    <React.Fragment>
      <Hidden xsDown>
        <Grid item sm={3}>
          <CategoriesList isMobile={!open} />
        </Grid>
      </Hidden>
      <Hidden xsUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          open={open}
          onClose={toggleMenu}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={classes.toolbar}>
            <SubHeader hasGutter={false} />
          </div>
          <Divider />
          <CategoriesList isMobile={!open} />
        </Drawer>
      </Hidden>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  onClose: PropTypes.func,
  window: PropTypes.any,
  open: PropTypes.bool,
};

export default Sidebar;
