import {useEffect} from 'react'
import Link from 'next/Link'
import Layout from '../../components/Layout'
import { styled } from '@mui/material/styles';
import {getCategories, deleteCategory} from '../../store/actions/categoryAction'
import {useRouter} from 'next/router';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {Box, Toolbar, Container, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Button} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Head from 'next/Head'
import useStyles from './styles';
import {useSelector, useDispatch} from 'react-redux'
import moment from 'moment';


const Categories = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getCategories())
  }, [])
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

  const {categories} = useSelector(state =>  state.category);

  const addCategory = () => {
    router.push('categories/add')
  }

  

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  }

    return (
        <Layout>
            <Head>
                <title>Blog - Categories</title>
                <link rel="icon" href="/favicon.ico" />
             </Head>
             <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
        <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Button variant="contained" color="success" onClick={addCategory} className={classes.btn}><AddIcon /> category</Button> <br />
            <br />
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={12} lg={12}>
                {
                  categories.length ? (
                 <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell align="left">Title</StyledTableCell>
                        <StyledTableCell align="left">Created At</StyledTableCell>
                        <StyledTableCell align="left">Actions</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {categories.map((category) => (
                        <StyledTableRow key={category._id}>
                          <StyledTableCell component="th" scope="row">
                            {category._id}
                          </StyledTableCell>
                          <StyledTableCell align="left">{category.title}</StyledTableCell>
                          <StyledTableCell align="left">{moment(category.isCreated).format("MMM Do YY")}</StyledTableCell>
                          <StyledTableCell align="left">
                            <Link href={`categories/${category._id}`}>
                              <a>
                                <Button>
                                  <EditIcon color="secondary" variant="contained" />
                                </Button>
                              </a>
                            </Link>
                            <Button onClick={() => handleDelete(category._id)} color="error" variant="contained">
                              <DeleteIcon />
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                    
                  ) : "No categories to show."
                }
              </Grid>
              {/* Recent Orders */}
            </Grid>
          </Container>  
        </Box>
        </Layout> 
     );
}
 
export default Categories;