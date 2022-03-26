import {useState} from 'react'
import Layout from '../../components/Layout';
import HeadTitle from '../../components/Head';
import {useRouter} from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {updateCategory} from '../../store/actions/categoryAction';
import {Box, Toolbar, Container, Grid, Paper, Button, TextField, Typography} from '@mui/material';


const EditCategory = ({category, id}) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(category.title);
    const router = useRouter();

    const handleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(title)
        const data =  {
          id,
          title:title
        }
        dispatch(updateCategory(router, data))
    }

 


    return <>
        <Layout>
            <HeadTitle title="Edit Categories"/>
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
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={12} lg={12}>
                  <Typography variant="h5">Create Category</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField 
                        //   error={error.title ? true : false}
                        //   helperText={error.title ? error.title : ""}
                          sx={{ width: 350, margin: '12px 0px'}} 
                          value={title} onChange={handleChange} 
                          id="outlined-basic" 
                          label="Enter Category name" 
                          variant="standard" /> 
                        <br/>
                        <Button variant="contained" color="success" type="submit">Update</Button>                    
                    </form>
              </Grid>
              {/* Recent Orders */}
            </Grid>
          </Container>  
        </Box>
        </Layout>
    </>
}
 

export const getServerSideProps = async({query, context}) => {
     const {id} = query;
     const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
     const res = await fetch(`${BASE_URL}/categories/${id}`);
     const data = await res.json();
     
     return {
         props: {
            id,
            category: data.category
         }
     }
}


export default EditCategory;