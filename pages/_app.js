import '../styles/globals.css'
import { useMediaQuery } from 'react-responsive';

import { UserContext, UserFormProvider } from '../lib/context';
import { useUserData } from '../lib/hooks';
import NextNProgress from 'nextjs-progressbar';

import Navbar from '../components/Navbar';
import BottomBar from '../components/BottomBar'

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  return <>
     <UserContext.Provider value={userData}>
       <UserFormProvider>
      {!isTabletOrMobile ?  <Navbar /> : ''}
      <NextNProgress color="#FF54AF" options={{ easing: "ease", speed: 400, showSpinner: false }}/>
      <Component {...pageProps} />
      {isTabletOrMobile ? <BottomBar/> : ''}
      </UserFormProvider>
    </UserContext.Provider>
  </> 
}

export default MyApp
