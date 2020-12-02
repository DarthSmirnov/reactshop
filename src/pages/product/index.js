import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { useLocation, useParams } from 'react-router-dom';
import api from '../../utils/api';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import NumberFormat from 'react-number-format';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../store/actions/index';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
  progress: {
    margin: '0 auto',
  },
  breadcrumbs: {
    marginBottom: theme.spacing(3),
  },
  imageWrapper: {
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(5),
    },
  },
  image: {
    width: '100%',
    display: 'block',
  },
  offsetTop: {
    marginTop: theme.spacing(5),
  },
  characterList: {
    padding: 0,
    // marginTop: theme.spacing(5),
    '& > li': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  buyBlock: {
    width: 200,
  },
}));

const getData = async (params) => {
  try {
    let category = null;
    let productData = (await api.get(`/products/${params.id}`)).data;
    productData.characters = productData.characters.map((item) => {
      let { name, val } = item;
      return { name, val };
    });
    let cat_id = productData.product.category_id;
    category = (await api.get(`/category/${cat_id}`)).data;

    return {
      ...productData,
      category,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const MyBreadcrumbs = (props) => {
  const { className, category, product, ...other } = props;

  return (
    <Breadcrumbs aria-label="breadcrumb" className={className} {...other}>
      <Link color="inherit" href="/">
        Home
      </Link>
      <Link color="inherit" href={`/category/${category.category_id}`}>
        {category.name}
      </Link>
      <Typography color="textPrimary">{product.name}</Typography>
    </Breadcrumbs>
  );
};
MyBreadcrumbs.propTypes = {
  className: PropTypes.string,
  category: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const Product = () => {
  let location = useLocation();
  let params = useParams();
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [tab, setTab] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const [snackbar, setSnackbar] = React.useState(false);
  const dispatch = useDispatch();

  const snackbarClose = (event, reason) => {
    if (reason !== 'clickaway') setSnackbar(false);
  };

  const addToCart = () => {
    dispatch(addProduct({ data: data.product, quantity: +quantity }));
    setSnackbar(true);
  };
  const onChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const onTabChange = (event, newValue) => {
    setTab(newValue);
  };
  React.useEffect(async () => {
    setData(await getData(params));
  }, [location, params]);

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbar}
        autoHideDuration={2000}
        onClose={snackbarClose}
        message="Product added to cart"
        key="topright"
      />
      {Object.keys(data).length == 0 && (
        <CircularProgress className={classes.progress} />
      )}
      {Object.keys(data).length > 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MyBreadcrumbs
              className={classes.breadcrumbs}
              category={data.category}
              product={data.product}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.imageWrapper}>
              <img
                src="//via.placeholder.com/390x500"
                alt={data.product.name}
                className={classes.image}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {data.product.name}
            </Typography>
            <Chip
              label={
                <NumberFormat
                  value={data.product.price}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
              }
            />
            <Typography variant="body1" component="div">
              <List
                dense
                className={`${classes.characterList} ${classes.offsetTop}`}
              >
                <ListItem>
                  <ListItemText disableTypography>
                    Manufacturer: {data.product.manufacturer}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText disableTypography>
                    Collection: {data.product.product_collection}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText disableTypography>
                    Article: {data.product.article}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText disableTypography>
                    Country: {data.country.name}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText disableTypography>
                    {data.product.availible > 0 && (
                      <React.Fragment>Availability: In stock</React.Fragment>
                    )}
                    {data.product.availible === 0 && (
                      <React.Fragment>
                        Availability: Out of stock
                      </React.Fragment>
                    )}
                  </ListItemText>
                </ListItem>
              </List>
            </Typography>
            <Box>
              <Grid
                container
                alignItems="center"
                spacing={1}
                className={classes.buyBlock}
              >
                <Grid item xs>
                  <TextField
                    type="number"
                    onChange={onChangeQuantity}
                    value={quantity}
                    fullWidth
                    size="small"
                    variant="outlined"
                    inputProps={{
                      min: 1,
                    }}
                  />
                </Grid>
                <Grid item>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={addToCart}
                    startIcon={<ShoppingCartIcon />}
                  >
                    buy
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} className={classes.offsetTop}>
            <Paper>
              <Tabs
                value={tab}
                indicatorColor="primary"
                textColor="primary"
                onChange={onTabChange}
              >
                <Tab label="Characteristics" />
                <Tab label="Description" />
              </Tabs>
              <TabPanel value={tab} index={0}>
                <TableContainer>
                  <Table>
                    <TableBody>
                      {data.characters.map((row, i) => (
                        <TableRow key={i}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell>{row.val}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel value={tab} index={1}>
                {data.product.description}
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default Product;
