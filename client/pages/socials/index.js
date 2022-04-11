import Layout from '../../components/Layout';
import Head from '../../components/Head';
import {useSelector, useDispatch} from 'react-redux'
import {getSocials, updateSocialLinks} from '../../store/actions/socialAction'
import {Box, Toolbar, Container, Grid, Paper, Button, Typography, TextField} from '@mui/material'
import { useEffect, useState } from 'react';
const Socials = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getSocials());
    }, [])

    const {socials, errors} = useSelector(state =>  state.social)
    const [socialForm, setSocialForm] = useState({
      facebook: socials[0]?.facebook ? socials[0]?.facebook : "",
      instagram: socials[0]?.instagram ? socials[0]?.instagram : "",
      twitter: socials[0]?.twitter ? socials[0]?.twitter : "",
      youtube: socials[0]?.youtube ? socials[0]?.youtube : ""
    })
    

    // handle onChange event on all fields
    const handleChange = (e) => {
      setSocialForm({
        ...socialForm,
          [e.target.name] : e.target.value
      })
    }

    const handleUpdate = (e) => {
      e.preventDefault();
      const id = socials[0]?._id
      dispatch(updateSocialLinks(id, socialForm));
    }
      return ( 
        <>
            <Layout>
                <Head title="Social Links" />
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
            <br />
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Typography variant="h4">Social Links</Typography>
                <form onSubmit={handleUpdate}>
                <TextField
                  helperText={errors.facebook ? errors.facebook : ""}
                  error={errors.facebook ? true : false} 
                  sx={{ width: '100%', margin: '12px 0px'}} 
                  id="outlined-basic"
                  value={socialForm.facebook}
                  onChange={handleChange}
                  name="facebook"
                  label="Facebook"
                  variant="outlined" />

                  <TextField
                  error={errors.instagram ? true : false}
                  helperText={errors.instagram ? errors.instagram : ""}  
                  sx={{ width: '100%', margin: '12px 0px'}} 
                  id="outlined-basic"
                  value={socialForm.instagram}
                  onChange={handleChange}
                  name="instagram"
                  label="Instagram"
                  variant="outlined" />

                  <TextField
                  error={errors.twitter ? true : false}
                  helperText={errors.twitter ? errors.twitter : ""}
                  sx={{ width: '100%', margin: '12px 0px'}} 
                  id="outlined-basic"
                  value={socialForm.twitter}
                  onChange={handleChange}
                  name="twitter"
                  label="Twitter"
                  variant="outlined" />

                  <TextField
                  error={errors.youtube ? true : false} 
                  helperText={errors.youtube ? errors.youtube : ""} 
                  sx={{ width: '100%', margin: '12px 0px'}} 
                  id="outlined-basic"
                  value={socialForm.youtube}
                  onChange={handleChange}
                  name="youtube"
                  label="Youtube"
                  variant="outlined" />
                  <Button type="submit" variant="contained" color="success">Update</Button>
                </form>
              </Grid>
            </Grid>
          </Container>  
        </Box>
            </Layout>
        </>
     );
}
 
export default Socials;