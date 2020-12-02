import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import Box from '@material-ui/core/Box';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store/actions/index';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles({
  media: {
    height: 200,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  btnBuy: {
    marginLeft: 'auto',
  },
});

const ProductItem = ({ data }) => {
  const classes = useStyles();
  const [snackbar, setSnackbar] = React.useState(false);
  const dispatch = useDispatch();

  const snackbarClose = (event, reason) => {
    if (reason !== 'clickaway') setSnackbar(false);
  };

  const addToCart = (data) => {
    let quantity = 1;
    dispatch(addProduct({ data, quantity }));
    setSnackbar(true);
  };

  return (
    <Card>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbar}
        autoHideDuration={2000}
        onClose={snackbarClose}
        message="Product added to cart"
        key="topright"
      />
      <CardActionArea>
        <Link
          to={`/category/${data.category_id}/product/${data.product_id}`}
          className={classes.link}
        >
          <CardMedia
            component="img"
            className={classes.media}
            image="//via.placeholder.com/390x500"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" align="center">
              {data.name}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions disableSpacing>
        <Typography variant="h6">
          <Box fontWeight="fontWeightRegular">
            <NumberFormat
              value={data.price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
            />
          </Box>
        </Typography>
        <Button
          className={classes.btnBuy}
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
          onClick={addToCart.bind(this, data)}
        >
          Buy
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
