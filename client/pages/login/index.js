import {useState, useEffect} from 'react'
import {Avatar, Grid, CssBaseline, Typography, TextField, Button, FormControlLabel, Checkbox, Link, Paper, Box} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import {login, profile} from '../../store/actions/authAction'
import {useDispatch, useSelector} from 'react-redux';
import { useRouter } from 'next/router'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


const theme = createTheme();

const Login = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const [auth, setAuth] = useState(false);
    const [loginForm, setLoginForm] = useState({
        email: '',
        password:''
    })

    useEffect(async() => {
      try{
       await axios.get(`${BASE_URL}/isAuth`)
        setAuth(true)
        router.push('/dashboard')

      } catch(err){
        if(err.response.data === 'Unauthorized'){
          router.push('/login')
        }
      }

    }, [])

    const handleLogin = (e) => {
        e.preventDefault();
         const user = {
             email: loginForm.email, 
             password: loginForm.password
         }

        dispatch(login(user, router))
        
    }
    const handleChange = (e) => {
        setLoginForm({...loginForm, [e.target.name] : e.target.value})
    }

    // catch all the errors
    const {email, password} = useSelector(state => state.error.errors)
    return (
      <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://wallpaperaccess.com/full/6170861.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
              <TextField
                error={email ? true : false}
                helperText={email ? email : ""}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={loginForm.email}
                onChange={handleChange}
                autoFocus
              />
              <TextField
                error={password ? true : false}
                helperText={password ? password : ""}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={loginForm.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    );
}



export default Login;