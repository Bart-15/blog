import {useState} from 'react'
import {Avatar, Grid, CssBaseline, Typography, TextField, Button, FormControlLabel, Checkbox, Link, Paper, Box} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import loginBackground from '../../public/assets/images/blog-login-image.png'
// import LockOutlinedIcon from '@mui/icons-materials';
import {login, profile} from '../../store/actions/authAction'
import {useDispatch} from 'react-redux';


const theme = createTheme();

const Login = () => {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password:''
    })

    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
         const user = {
             email: loginForm.email, 
             password: loginForm.password
         }

        dispatch(login(user))
        
    }
    const handleChange = (e) => {
        setLoginForm({...loginForm, [e.target.name] : e.target.value})
    }

    const getProfile = () => {
        dispatch(profile())
    }

    const handleSubmit  = () => {
        console.log('hello')
    }

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