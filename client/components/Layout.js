import {useState} from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'
import {Box, CssBaseline} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
const mdTheme = createTheme();

const Layout = ({children}) => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };
    return ( 
        <ThemeProvider theme={mdTheme}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline />
                <Navbar open={open} toggleDrawer={toggleDrawer} />
                <Sidebar open={open} toggleDrawer={toggleDrawer}/>
                {children}
            </Box>
        </ThemeProvider>
     );
}
 
export default Layout;