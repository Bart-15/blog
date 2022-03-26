import {useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import {addPost} from '../../store/actions/postAction';
import {getCategories} from '../../store/actions/categoryAction';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router'
import Select from '@mui/material/Select';
import {Box, Toolbar, Container, Grid, TextField, MenuItem, Paper, Button, InputLabel, Typography} from '@mui/material';
import Head from '../../components/Head'
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; // Add css for snow theme


const AddPost = () => {
    const { quill, quillRef } = useQuill();
    const dispatch = useDispatch();
    const router = useRouter();



    useEffect(() => {
      dispatch(getCategories());
    }, [])


    const [category, setCategory] = useState("")
    const [file, setFile] = useState("")
    const {categories} = useSelector(state =>  state.category);
    const [text, setText] = useState("")

    const {errors} = useSelector(state =>  state.error);


    useEffect(() => {
       if (quill) {
        quill.clipboard.dangerouslyPasteHTML("");
        quill.on('text-change', (delta, oldDelta, source) => {
        setText(quill.root.innerHTML)
      });
    }
    }, [quill])
    
    const [data, setData] = useState({
      title: "",
      author: "",
      richDescription: "",
      description: "",
    })


    const handleChange = (e) => {
      setData({...data, [e.target.name] : e.target.value})
    }


    const handleUpdate = (e) => {
      e.preventDefault();

      const formData = new FormData();
	  	formData.append('image', file);
        formData.append('author', data.author);
        formData.append('title', data.title);
        formData.append('category', category)
        formData.append('richDescription', text);
        formData.append('description', data.description)

       
      dispatch(addPost(formData, router));
    }
    
        return ( 
        <>
        <Layout>
        <Head title="Add Post"/>
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
                      error={errors.title ? true : false}
                      helperText={errors.title ? errors.title : ""}
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
                      error={errors.author ? true : false}   
                      helperText={errors.author ? errors.author : ""}                
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
                      error={errors.category ? true : false}
                      helperText={errors.category ? errors.category : ""}
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
                    error={errors.description ? true : false}
                    helperText={errors.description ? errors.description : ""}
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
                  <div ref={quillRef} />
                  {/* <ReactQuill  defaultValue={quillValue} onChange={handleQuillChange} /> */}
                </Grid>
              </Grid> 
              <br/> 
              <br />   
              <Grid container spacing={2}>
                <Grid xs={12} md={6}  item>
                   <TextField 
                    error={errors.image ? true : false} 
                    type="file" 
                    name="image" 
                    helperText={errors.image ? errors.image : ""}
                    onChange={(e) => setFile(e.target.files[0])
                    } />
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

export default AddPost;