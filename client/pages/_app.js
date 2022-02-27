
import '../styles/globals.css'
import {Provider} from 'react-redux';
import {createWrapper} from 'next-redux-wrapper'
import store from '../store/store'
import checkAuth  from '../utils/isAuth';
import {useEffect} from 'react'

const MyApp = ({Component, pageProps}) => {
  useEffect(() => {
    checkAuth();
  }, [])
  return (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
  )
};


const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default  wrapper.withRedux(MyApp);