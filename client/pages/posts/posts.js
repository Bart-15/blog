import { Table, TableBody, TableContainer, TableHead, TableRow, Button, Paper} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {styled} from '@mui/material/styles';
import moment from 'moment';
import Link from 'next/Link';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useDispatch} from 'react-redux';
import {deletePost} from '../../store/actions/postAction';
const Posts = ({posts}) => {
  const dispatch = useDispatch();

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

  const handleDelete = (id) => {
    dispatch(deletePost(id))
  }

    return ( 
        <>
         {
           posts.length ? (
                 <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="left">Title</StyledTableCell>
                        <StyledTableCell align="left">Author</StyledTableCell>
                        <StyledTableCell align="left">Category</StyledTableCell>
                        <StyledTableCell align="left">isFeatured</StyledTableCell>
                        <StyledTableCell align="left">Created At</StyledTableCell>
                        <StyledTableCell align="left">Actions</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {posts.map((post) => (
                        <StyledTableRow key={post._id}>
                          <StyledTableCell align="left">{post.title}</StyledTableCell>
                          <StyledTableCell align="left">{post.author}</StyledTableCell>
                          <StyledTableCell align="left">{post.category.title}</StyledTableCell>
                          <StyledTableCell align="left">{post.isFeatured.toString()}</StyledTableCell>
                          <StyledTableCell align="left">{moment(post.isCreated).format("MMM Do YY")}</StyledTableCell>
                          <StyledTableCell align="left">
                            <Link href={`posts/${post._id}`}>
                              <a>
                                <Button>
                                  <EditIcon color="secondary" variant="contained" />
                                </Button>
                              </a>
                            </Link>
                            <Button onClick={() => handleDelete(post._id)} color="error" variant="contained">
                              <DeleteIcon />
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
               ) : "No posts to show."
            }
        </>
     );
}
 
export default Posts;