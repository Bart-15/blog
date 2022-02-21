import {useEffect} from 'react';
import {SET_USER, SET_USER_LOADING} from '../../store/actions/types'
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios'
import {store} from '../../store/store'


const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.withCredentials = true;


const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {

    
    checkAuth();
  }, [])
  
  
  
  
  
  // check use isAuth: true;
  const checkAuth = async() => {
    try {
      dispatch({type:SET_USER_LOADING})
      const res = await axios.get(`${BASE_URL}/checkAuth`);       
      dispatch({
        type:SET_USER,
        payload:res.data.user
      })
    }catch(e) {
      console.log(e.message)
    }  
    
  }
  const {isAuth, user, loading} = useSelector(state =>  state.user)

  if(!isAuth) {
    return (
      <div>Not authorized</div>
    )
  }
    return ( 
        <div>
          {
            loading ? (<h1>Loading...</h1>) : (<h1>Hello, {user.name}</h1>) 
          }
        </div>
     );
}
 
export default Dashboard;