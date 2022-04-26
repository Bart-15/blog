import {useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import {getSinglePost, editPost} from '../../store/actions/postAction';
import {getCategories} from '../../store/actions/categoryAction';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router'
import Select from '@mui/material/Select';
import {Box, Toolbar, Container, Grid, TextField, MenuItem, Paper, Button, InputLabel, Typography} from '@mui/material';
import Head from '../../components/Head'
import Image from 'next/image'
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; // Add css for snow theme


const EditPost = ({id, post}) => {
    const { quill, quillRef } = useQuill();
    const dispatch = useDispatch();
    const router = useRouter();



    useEffect(() => {
      dispatch(getCategories());
    }, [])


    const [category, setCategory] = useState(post?.category?._id)
    const [file, setFile] = useState("")
    const [tempImage, setTempImage] = useState("")
    const {categories} = useSelector(state =>  state.category);
    const [text, setText] = useState(post.richDescription)

    useEffect(() => {
       if (quill) {
        quill.clipboard.dangerouslyPasteHTML(`${post.richDescription}`);
        quill.on('text-change', (delta, oldDelta, source) => {
        setText(quill.root.innerHTML)
      });
    }
    }, [quill])
    
    const [data, setData] = useState({
      title: post.title,
      author: post.author,
      description: post.description,
      richDescription: post.richDescription,
    })


    const handleChange = (e) => {
      setData({...data, [e.target.name] : e.target.value})
    }

    const handleFileChange = (e) => {
      let url = URL.createObjectURL(e.target.files[0])
      setTempImage(url);
      setFile(e.target.files[0])


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

      // console.log("this is the text", text);
      dispatch(editPost(id, formData, router));
    }

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
                <div style={{ width: '100%', height: 300, marginBottom:'50px' }}>
                  <div ref={quillRef} />
                </div>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid xs={12} md={6}  item>
                  {
                      tempImage ? 
                      (<Image src={tempImage} width={250} height={250}></Image>) 
                      : (<Image src={post.image} width={250} height={250} /> )
                  }
                   <input type="file" name="image" onChange={handleFileChange} />
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
     
     return {
        props : {
            id,
            post: data.post    
        }
     }
}
export default EditPost;