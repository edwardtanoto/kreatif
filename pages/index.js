import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';

import Loader from '../components/Loader'
import PostFeed from '../components/PostFeed';
import { UsernameForm } from '../components/UsernameForm';
import { firestore, fromMillis, postToJSON } from '../lib/firebase';
import {InputGroup,FormControl} from 'react-bootstrap';
import AuthCheck from '../components/AuthCheck';
import {Title} from '../components/Title';
import Navbar from '../components/Navbar';

import { useState, createContext, useContext } from 'react';
import { UserFormContext } from '../lib/context';

// const LIMIT = 10;

// export async function getServerSideProps(context) {
//   const postsQuery = firestore
//     .collectionGroup('posts')
//     .where('published', '==', true)
//     .orderBy('createdAt', 'desc')
//     .limit(LIMIT);

//   const posts = (await postsQuery.get()).docs.map(postToJSON);
//   return {
//     props: { posts }, // will be passed to the page component as props
//   };
// }

export default function Home(props) {
  const [userform, setUserForm] = useState('')
  const user = useContext(UserFormContext);

  const router = useRouter()
  const handleClick = (e) => {
    e.preventDefault()
    router.push('/auth')
  }
  const onChange = (e) => {
    user.setUserForm(e.target.value)
  }
  // const [posts, setPosts] = useState(props.posts);
  // const [loading, setLoading] = useState(false);

  // const [postsEnd, setPostsEnd] = useState(false);

  // const getMorePosts = async () => {
  //   setLoading(true);
  //   const last = posts[posts.length - 1];

  //   const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

  //   const query = firestore
  //     .collectionGroup('posts')
  //     .where('published', '==', true)
  //     .orderBy('createdAt', 'desc')
  //     .startAfter(cursor)
  //     .limit(LIMIT);

  //   const newPosts = (await query.get()).docs.map((doc) => doc.data());

  //   setPosts(posts.concat(newPosts));
  //   setLoading(false);

  //   if (newPosts.length < LIMIT) {
  //     setPostsEnd(true);
  //   }
  // };

  return (
    <UserFormContext.Provider value={userform}>
      <main>
        <h1 className='title'>Kreatif, the future of Indonesian freelance &#10024;</h1>
        <AuthCheck fallback={
          <>
          <div className='middle'>
            <UsernameForm onsubmit={handleClick} onchange={onChange}/>
          {/* <form className='username-form' onSubmit={handleClick}>
            <label className='middle'>kreatif.app/</label>
            <input className='middle' type="text" placeholder='nama' onChange={onChange}/>
            <button>Buat Akun</button>
            </form> */}
           </div>
           <p className='subtitle'>Gratis & sign up dalam 5 menit.</p>
           </>
          }>
            <Link href='/admin'>Create More Use Case</Link>
        </AuthCheck>
        {/* {posts.length == 0 ? 'Empty' : 
        <>
            <PostFeed posts={posts} />

            {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}

            <Loader show={loading} />

            {postsEnd && 'You have reached the end!'}
        </>}
     */}
      </main>
      </UserFormContext.Provider>
  );
}
