// import {useEffect} from 'react';
// import Head from 'next/Head'
// import {logout} from '../../store/actions/authAction'
// import checkAuth from '../../utils/isAuth'
// import {useDispatch, useSelector} from 'react-redux';
// import {useRouter} from 'next/router'
// import {Button} from '@mui/material'



// const Dashboard = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   useEffect(() => {
//     checkAuth();
//   }, [])
  

//   const handleLogout = () => {
//     dispatch(logout(router))
//   }

//   const {isAuth, user, loading} = useSelector(state =>  state.auth)

  
//     return ( 
//         <div>
//           <Head>
//             <title>Bart- Dashboard</title>
//             <link rel="icon" href="/favicon.ico" />
//           </Head>
//           {
//            !isAuth || loading ? "" : (
//              <div>
//                <h1>Hello, {user.name}</h1>
//                <Button variant="contained" color="secondary" onClick={() => handleLogout()}>Logout</Button>
//              </div>
//            ) 
//           }
//         </div>
//      );
// }
 
// export default Dashboard;
import {useEffect} from 'react'
import {Box, Toolbar, Container, Grid, Paper} from '@mui/material'
import Layout from '../../components/Layout'
import Head from 'next/Head'
import checkAuth from '../../utils/isAuth'





const Dashboard = () => {
  return (
    <Layout>
       <Head>
            <title>Blog - Dashboard</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
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
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
    </Layout>
  )
}
 


export default Dashboard;