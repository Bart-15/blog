import {useState} from 'react'
import Layout from '../../components/Layout';
import HeadTitle from '../../components/Head';
import {useRouter} from 'next/router'
import {addCat} from '../../store/actions/categoryAction' 
import {useDispatch, useSelector} from 'react-redux';
import {Box, Toolbar, Container, Grid, Paper, Button, TextField, Typography} from '@mui/material';
const AddCategory = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    
    const handleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = (e) => {
        const data = {title:title}
        e.preventDefault();
        dispatch(addCat(router, data));
    }


    const error = useSelector(state =>  state.error.errors);

    return ( 
        <Layout>
             <HeadTitle title="Categories"/>
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
                          error={error.title ? true : false}
                          helperText={error.title ? error.title : ""}
                          sx={{ width: 350, margin: '12px 0px'}} 
                          value={title} onChange={handleChange} 
                          id="outlined-basic" 
                          label="Enter Category name" 
                          variant="standard" /> 
                        <br/>
                        <Button variant="contained" color="primary" type="submit">Add</Button>                    
                    </form>
              </Grid>
              {/* Recent Orders */}
            </Grid>
          </Container>  
        </Box>
        </Layout>
     );
}
 
export default AddCategory;