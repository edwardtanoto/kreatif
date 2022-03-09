import { getUserWithUsername, postToJSON ,auth, serviceToJSON} from '../../lib/firebase';
import UserProfile from '../../components/UserProfile';
import PostFeed from '../../components/PostFeed';
import { UserContext } from '../../lib/context';
import {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import Link from 'next/link';
import ServiceForm from '../../components/ServiceForm'
import ServiceFeed from '../../components/ServiceFeed'
import { Box,Tab, Tabs, Typography }from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);
  
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  // JSON serializable data
  let user = null;
  let posts = null;
  let services = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(5);
    posts = (await postsQuery.get()).docs.map(postToJSON);

    const servicesQuery = userDoc.ref
      .collection('services')
      .limit(5)
    services = (await servicesQuery.get()).docs.map(serviceToJSON);
  }

  return {
    props: { user, posts, username,services }, // will be passed to the page component as props
  };
}

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'PlusJakarta',
    },
  },
  palette: {
    secondary: {
      main: '#fff',
    },
  },
});

export default function UserProfilePage({ user, posts, services, username }) {
  const { user: currentUser } = useContext(UserContext);
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <main>
      <UserProfile userdata={user} currentUser={currentUser}/>
      <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%' }}>
      
      <Tabs value={value} onChange={handleChange} centered textColor='white' indicatorColor="secondary" >
        <Tab label="Projects" />
        <Tab label="Service" />
      </Tabs> 
      <TabPanel value={value} index={0}>
          <PostFeed posts={posts} />
          {currentUser?.photoURL === user?.photoURL? <>
            <h1>Create Case Studies</h1>
          <Link href="/admin"> 
              <button className='btn-green'>New</button>
          </Link>
          </>  : '' }
         
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ServiceFeed services={services}/>
          {currentUser?.photoURL === user?.photoURL ?
          <>
            <br/>
          <p>Add another service</p>
          <ServiceForm />
          </> : ''}
         
        </TabPanel>
    </Box>
    </ThemeProvider>
    </main>
  );
}