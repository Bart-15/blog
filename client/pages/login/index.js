import {useState} from 'react'
import {Card, Grid, Container, CardContent, TextField, Button} from '@mui/material'
import {login, profile} from '../../store/actions/authAction'
import {useDispatch} from 'react-redux';

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
    return (
        <Container>
            <Grid container>
                <Grid item>
                    <Card sx={{ minWidth: 400 }}>
                        <CardContent>
                            <form onSubmit={handleLogin}>
                                <div>
                                    <TextField type="text" name="email" value={loginForm.email} onChange={handleChange}  label="Email" variant="outlined" />
                                    <TextField type="password" name="password" value={loginForm.password} onChange={handleChange}  label="Password" variant="outlined" />
                                </div>
                                <div>
                                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                    <Button onClick={getProfile}>Get profile</Button>
                </Grid>
            </Grid>
        </Container>
    );
}



export default Login;