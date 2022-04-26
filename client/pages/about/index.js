import {useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import HeadTitle from '../../components/Head';
import {Box, Toolbar, Container, Grid, Paper, Button, TextField, Typography} from '@mui/material';
import { useQuill } from 'react-quilljs';
import axios from 'axios';
axios.defaults.withCredentials = true;
import 'quill/dist/quill.snow.css'; // Add css for snow theme


const About = ({data, url}) => {
  const about = data[0];
  const id = about._id;
  const { quill, quillRef } = useQuill();
  const [text, setText] = useState(about.richDescription)
  const [title, setTitle] = useState(about.titleDescription);

  
  useEffect(() => {
    if (quill) {
     quill.clipboard.dangerouslyPasteHTML(about.richDescription);
     quill.on('text-change', (delta, oldDelta, source) => {
     setText(quill.root.innerHTML)
   });
 }
 }, [quill])

 const handleSubmit = async (e) => {
   e.preventDefault();
    const data = {
      titleDescription: title,
      richDescription: text
    }
    try {
      if(!data) {
        return console.log("No data");
      }

      await axios.patch(`${url}/about/${id}`, data);
      alert("updated sucessdully");
    }catch(err){
      console.log(err);
    }
 
  }

    return ( 
        <Layout>
            <HeadTitle title="About" />
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
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={12} lg={12}>
                  <Typography variant="h4">About Us</Typography>
                <TextField 
                      sx={{ width: '100%', margin: '12px 0px'}} 
                      id="outlined-basic"
                      name="title"
                      onChange={(e) => setTitle(e.target.value)} 
                      label="Title" 
                      value={title}
                      variant="outlined" />    
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <div ref={quillRef}/>    
                </Grid>
                <Grid item xs={12} md={12} lg={12} style={{marginTop:'50px'}}>
                  <Button type="submit" variant="contained" color="success">Update</Button>  
                </Grid>
                {/* Recent Orders */}
              </Grid>
           </form>
          </Container>  
        </Box>
        </Layout>
     );
}
 

export async function getServerSideProps() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${BASE_URL}/about`);
  const data = await res.json();
  return { props: { data: data, url: BASE_URL } };

}

export default About;