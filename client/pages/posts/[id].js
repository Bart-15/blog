import {useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import {getSinglePost} from '../../store/actions/postAction';
import {getCategories} from '../../store/actions/categoryAction';
import Switch from '@mui/material/Switch';
import {useDispatch, useSelector} from 'react-redux';
import { styled } from '@mui/material/styles';
import dynamic from 'next/dynamic'
import Select from '@mui/material/Select';
import 'react-quill/dist/quill.snow.css'; // ES6
import {Box, Toolbar, Container, Grid, TextField, MenuItem, Paper, Button, InputLabel, Typography} from '@mui/material';
import Head from '../../components/Head'

const EditPost = ({id, post}) => {
    const dispatch = useDispatch();
    
    
    useEffect(() => {
      dispatch(getCategories());
      dispatch(getSinglePost(id))
    }, [])
    
    const [category, setCategory] = useState(post?.category?._id)
    const [file, setFile] = useState("")
    const {categories} = useSelector(state =>  state.category);
    
    
    const [data, setData] = useState({
      title: post.title,
      author: post.author,
      richDescription: post.richDescription,
      description: post.description,
    })

    const ReactQuill = dynamic(() => import('react-quill'), { ssr: false} );

    const handleChange = (e) => {
      setData({...data, [e.target.name] : e.target.value})
    }


    const handleUpdate = (e) => {
      e.preventDefault();

      const formData = new FormData();

	  	formData.append('image', file);
      console.log(formData.get('image'))
      console.log(data)
    }

    // console category
        return ( 
        <>
        <Layout>
        <Head title="Edit Post"/>
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
              <Typography variant="h4">Edit Post</Typography>
             <form onSubmit={handleUpdate}>
             <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <TextField 
                      sx={{ width: '100%', margin: '12px 0px'}} 
                      id="outlined-basic"
                      name="title"
                      onChange={handleChange} 
                      label="Title" 
                      value={data.title}
                      variant="outlined" />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField 
                      sx={{ width: '100%', margin: '12px 0px'}} 
                      id="outlined-basic" 
                      label="Author"
                      name="author"
                      onChange={handleChange}
                      value={data.author} 
                      variant="outlined" />
                  </Grid>
                  <Grid item xs={12} md={4}>
                  <Select
                      autoWidth
                      label="Categories"
                      name="category"
                      value={category}
                      onChange={(e) =>  setCategory(e.target.value)}
                      sx={{ width: '100%', margin: '12px 0px'}} 
                      variant="outlined"
                    >                        
                      {
                        categories.map((category, id) => {
                          return (
                            <MenuItem key={id} value={category._id}>{category.title}</MenuItem>
                          )
                        })
                      }
                    </Select>
                  </Grid>
              </Grid>
              <Grid container spacing={2}>
                  <Grid item  xs={12} md={6}>
                    <TextField
                    id="outlined-multiline-static"
                    onChange={handleChange}
                    name="description"
                    label="Description"
                    sx={{ width: '100%', margin: '12px 0px'}}
                    multiline
                    value={data.description}
                    rows="5"
                    margin="normal"
                    variant="outlined"
                  />
                  </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid xs={12}  item>
                  <ReactQuill name="richDescription" value={data.richDescription} onChange={handleChange} />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid xs={12} md={6}  item>
                   <input type="file" name="image" onChange={(e) => setFile(e.target.files[0])} />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained">Submit</Button>
             </form>  
          </Container> 
        </Box>
        </Layout>
        </>
     );
}
 

export const getServerSideProps = async({query, props}) => {
     const {id} = query;
     const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
     const res = await fetch(`${BASE_URL}/posts/${id}`);
     const data = await res.json();
     
     console.log(data.post)
     return {
        props : {
            id,
            post: data.post    
        }
     }
}
export default EditPost;