import '../styles/globals.css'

import { UserContext, UserFormProvider } from '../lib/context';
import { useUserData } from '../lib/hooks';
import NextNProgress from 'nextjs-progressbar';
import { Progress } from '../components/progress';

import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return <>
     <UserContext.Provider value={userData}>
       <UserFormProvider>
      <Navbar />
      <NextNProgress/>

      <Component {...pageProps} />
      </UserFormProvider>
    </UserContext.Provider>
  </> 
}

export default MyApp
