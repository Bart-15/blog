import {useEffect} from 'react';
import Layout from '../../components/Layout'
import Head from '../../components/Head'
import AddIcon from '@mui/icons-material/Add';
import {useSelector, useDispatch} from 'react-redux'
import Posts from './posts'
import Link from 'next/Link'
import {getPosts} from '../../store/actions/postAction'
import {Box, Toolbar, Container, Grid, Paper, Button} from '@mui/material'
const Post = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [])


  const {posts} = useSelector(state =>  state.post)
    return ( 
        <>
         <Layout>
            <Head title="Post"/>
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
            <Link href="/posts/add">
              <a>
                <Button variant="contained" color="success"><AddIcon /> Post</Button> <br />
              </a>
            </Link>
            <br />
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                {/* todo: display all posts */}
                <Posts posts={posts} />
              </Grid>
            </Grid>
          </Container>  
        </Box>
         </Layout>
        </>
     );
  }
 
export default Post;