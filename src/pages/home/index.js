import React from 'react';
import Slider from './Slider';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import ProductItem from '../../components/ProductItem';
import api from '../../utils/api';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  slider: {
    marginBottom: theme.spacing(5),
  },
  progress: {
    margin: '0 auto',
  },
}));

const Home = () => {
  const classes = useStyles();
  const [sale, setSale] = React.useState([]);

  React.useEffect(async () => {
    try {
      setSale((await api.get('/sale')).data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <React.Fragment>
      <Slider className={classes.slider} />
      <Typography variant="h4" gutterBottom>
        Sale
      </Typography>
      <Grid container spacing={3}>
        {sale.length == 0 && <CircularProgress className={classes.progress} />}
        {sale.length > 0 &&
          sale.map((item, i) => (
            <Grid key={i} item xs={12} md={6} lg={4}>
              <ProductItem data={item} />
            </Grid>
          ))}
      </Grid>
    </React.Fragment>
  );
};

export default Home;
