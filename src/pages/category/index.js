import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Pagination from '@material-ui/lab/Pagination';
import { useLocation, useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
import ProductItem from '../../components/ProductItem';
import api from '../../utils/api';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
  filters: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(5),
  },
  pagination: {
    marginTop: theme.spacing(5),
    display: 'flex',
    justifyContent: 'center',
  },
  products: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  progress: {
    margin: '0 auto',
  },
}));

const getData = async (props) => {
  try {
    let url = `/category/${props.id}/products`;
    let { limit, sort, page } = props;
    let res = (await api.get(url, { limit, sort, page }, true)).data;
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Category = () => {
  let query = useQuery();
  let location = useLocation();
  let params = useParams();
  let defaultPage = query.get('page') ? query.get('page') : 1;
  let defaultLimit = query.get('limit') ? query.get('limit') : 9;
  let defaultSort = query.get('sort') ? query.get('sort') : 1;
  const classes = useStyles();
  const sortList = [
    {
      text: 'Price asc',
      value: { price: 'asc' },
    },
    {
      text: 'Price desc',
      value: { price: 'desc' },
    },
    {
      text: 'Name asc',
      value: { name: 'asc' },
    },
    {
      text: 'Name desc',
      value: { name: 'desc' },
    },
  ];
  const [products, setProducts] = React.useState([]);
  const [sort, setSort] = React.useState(+defaultSort);
  const [total, setTotal] = React.useState(0);
  const [limit, setLimit] = React.useState(+defaultLimit);
  const [page, setPage] = React.useState(+defaultPage);
  const [loading, setLoading] = React.useState(true);

  async function loadData() {
    setLoading(true);
    let props = {
      id: params.id,
      limit,
      sort: sortList[sort].value,
      page,
    };

    const res = await getData(props);
    if (limit > total) await setPage(1);
    await setProducts(res.products);
    await setTotal(res.total);
    setLoading(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  async function resetData() {
    await setPage(1);
  }
  //TODO: fix double request
  React.useEffect(() => resetData().then(() => loadData()), [
    location,
    sort,
    limit,
  ]);
  React.useEffect(() => loadData(), [page]);

  const onPage = (event, value) => {
    setPage(value);
  };

  const onLimit = (event) => {
    setLimit(event.target.value);
  };

  const onSort = (event) => {
    setSort(event.target.value);
  };

  return (
    <React.Fragment>
      <Paper className={classes.filters}>
        <FormControl
          variant="outlined"
          size="small"
          className={classes.formControl}
        >
          <InputLabel id="sort-label">Sort by</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            value={sort}
            onChange={onSort}
          >
            {sortList.length > 0 &&
              sortList.map((item, i) => (
                <MenuItem key={i} value={i}>
                  {item.text}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl
          size="small"
          variant="outlined"
          className={classes.formControl}
        >
          <InputLabel id="limit-label">Limit</InputLabel>
          <Select
            labelId="limit-label"
            id="limit-select"
            value={limit}
            onChange={onLimit}
          >
            {[9, 18, 36, 48].map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
      <Grid container spacing={3} className={classes.products}>
        {loading && <CircularProgress className={classes.progress} />}
        {!loading &&
          products.map((item, i) => (
            <Grid key={i} item xs={12} md={6} lg={4}>
              <ProductItem data={item} />
            </Grid>
          ))}
      </Grid>
      <Pagination
        className={classes.pagination}
        count={Math.ceil(total / limit)}
        page={+page}
        onChange={onPage}
      />
    </React.Fragment>
  );
};

export default Category;
