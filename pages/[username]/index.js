import { getUserWithUsername, postToJSON ,auth} from '../../lib/firebase';
import UserProfile from '../../components/UserProfile';
import PostFeed from '../../components/PostFeed';
import { UserContext } from '../../lib/context';
import {useContext, useEffect, useState} from 'react'

export async function getServerSideProps({ query }) {
  const { username } = query;
  console.log(username)

  const userDoc = await getUserWithUsername(username);
  
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  // JSON serializable data
  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(5);
    posts = (await postsQuery.get()).docs.map(postToJSON);
  }

  return {
    props: { user, posts }, // will be passed to the page component as props
  };
}

export default function UserProfilePage({ user, posts }) {
  const { user: currentUser } = useContext(UserContext);
  return (
    <main>
        <UserProfile userdata={user}/>   
      <PostFeed posts={posts} />
    </main>
  );
}