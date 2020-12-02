import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import api from '../../utils/api';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import { Box, Container, Divider } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { removeFromCart, clearCart } from '../../store/actions/index';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(5),
  },
  formTitle: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  mTop: {
    marginTop: theme.spacing(3),
  },
  progress: {
    marginRight: theme.spacing(1),
  },
}));

const Cart = () => {
  const classes = useStyles();
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const snackbarClose = (event, reason) => {
    if (reason !== 'clickaway') setSnackbar(false);
  };
  const [form, setForm] = React.useState({
    email: '',
    name: '',
    address: '',
  });
  const total = cart.reduce(
    (total, cur) => total + cur.price * cur.quantity,
    0
  );
  const remove = (index) => {
    dispatch(removeFromCart(index));
  };

  const handleFieldChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let res = (await api.post('/cart/order', { form, cart })).data;
      await dispatch(clearCart());
      setMessage(res.message);
      setSnackbar(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbar}
        autoHideDuration={2000}
        onClose={snackbarClose}
        message={message}
        key="topright"
      />
      {cart.length === 0 && (
        <Container>
          <Typography variant="h4" align="center">
            Cart empty
          </Typography>
        </Container>
      )}
      {cart.length > 0 && (
        <Container>
          <Typography variant="h4" gutterBottom>
            Cart
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((row, index) => (
                  <TableRow key={row.product_id}>
                    <TableCell component="th" scope="row">
                      <Link
                        component={RouterLink}
                        color="inherit"
                        to={`/category/${row.category_id}/product/${row.product_id}`}
                      >
                        {row.name}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">
                      <NumberFormat
                        value={row.price * row.quantity}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="delete"
                        onClick={remove.bind(this, index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4} align="right">
                    Summary:
                    <Box fontWeight="fontWeightBold" component="span">
                      <NumberFormat
                        value={total}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          <Paper className={classes.form}>
            <form noValidate autoComplete="off" onSubmit={onSubmit}>
              <Typography variant="h6" className={classes.formTitle}>
                <Container>Order form</Container>
              </Typography>
              <Divider />
              <Container className={classes.mTop}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      value={form.name}
                      onChange={handleFieldChange}
                      fullWidth
                      label="Full name"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      value={form.email}
                      onChange={handleFieldChange}
                      fullWidth
                      label="Email"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="address"
                      value={form.address}
                      onChange={handleFieldChange}
                      label="Shipment address"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      type="submit"
                      onClick={onSubmit}
                      disabled={loading}
                    >
                      {loading && (
                        <CircularProgress
                          size={18}
                          color="secondary"
                          className={classes.progress}
                        />
                      )}
                      Order
                    </Button>
                  </Grid>
                </Grid>
              </Container>
            </form>
          </Paper>
        </Container>
      )}
    </React.Fragment>
  );
};

export default Cart;
