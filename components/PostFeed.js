import Link from 'next/link';
import { useEffect, useState } from 'react';
import {gradient}  from '../mock/gradient';

export default function PostFeed({ posts, admin }) {
  return posts ? posts.map((post) => <PostItem post={post} key={post.slug} admin={admin} />) : null;
}

function PostItem({ post, admin = false }) {
  // Naive method to calc word count and read time
  const [thumbnail, setThumbnail] = useState('')
  const random = gradient[Math.floor(Math.random() * (gradient.length - 1))] 
  const wordCount = post?.content.trim().split(/\s+/g).length;
 
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);
  useEffect(()=> {
    try {
        setThumbnail(post?.content.match(/!\[.*?\]\((.*?)\)/)[1])
      } catch (error) {
        setThumbnail(random)
      }
  },[post])
  return (
    <div className="post-card">
        <div className='left'>
        <Link href={`/${post.username}/${post.slug}`}>
            <img src={thumbnail} className='post-img'/>
        </Link>
        </div>
        <div className='right'>
   

      <Link href={`/${post.username}/${post.slug}`}>
        <h2>
          <a>{post.title}</a>
        </h2>
      </Link>

      <footer className='post-footer'>
        <span>
          {wordCount} words. &nbsp; {minutesToRead} min read
        </span> &nbsp;&nbsp;
        <span className="push-left">💗 &nbsp; {post.heartCount || 0}</span>
      </footer>
        </div>
      {/* If admin view, show extra controls for user */}
      {admin && (
        <>
          <Link href={`/admin/${post.slug}`}>
            <h3>
              <button className="btn-blue">Edit</button>
            </h3>
          </Link>

          {post.published ? <p className="text-success">Live</p> : <p className="text-danger">Unpublished</p>}
        </>
      )}
    </div>
  );
}