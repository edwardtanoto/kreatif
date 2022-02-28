import { getUserWithUsername, postToJSON ,auth} from '../../lib/firebase';
import UserProfile from '../../components/UserProfile';
import PostFeed from '../../components/PostFeed';
import { UserContext } from '../../lib/context';
import {useContext, useEffect, useState} from 'react'

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
    props: { user, posts, username }, // will be passed to the page component as props
  };
}

export default function UserProfilePage({ user, posts, username }) {
  const { user: currentUser } = useContext(UserContext);
  console.log(username, user, currentUser)
  return (
    <main>
      <UserProfile userdata={user} currentUser={currentUser}/>
      <PostFeed posts={posts} />
    </main>
  );
}