// UI component for userdata profile
import {useState, useEffect} from 'react'
import Router from 'next/router'
import { firestore,auth, serverTimestamp } from '../lib/firebase';

import toast, {Toaster} from 'react-hot-toast';

const ServiceForm = () => {
    const [item, setItem] = useState('')
    const [brief, setBrief] = useState('')
    const [price, setPrice] = useState('')
    const uniq = 'id' + (new Date()).getTime();

    const handleKeyDown = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight + 20}px`; 
    }
    const createPost = async (e) => {
        e.preventDefault();
        const uid = auth.currentUser.uid;
        const ref = firestore.collection('users').doc(uid).collection('services').doc(uniq);

        const data = {
          item,
          brief,
          price,
        };
    
        await ref.set(data);
        
        toast.success('Post created!')
        Router.reload(window.location.pathname)
      };
  return (
    <>
    <form onSubmit={createPost}>
        <label className='user-profile-label'>Price</label>
        <input className="user-profile-bio" onKeyDown={handleKeyDown} type='number' value={price} onChange={(e) => setPrice(e.target.value)} placeholder={'$5000'} minLength={0}/>
        <br/><br/>
        <label className='user-profile-label'>Item</label>
        <input className="user-profile-bio" onKeyDown={handleKeyDown} value={item} onChange={(e) => setItem(e.target.value)} placeholder={'Build Web Application'} minLength={1}/>
        <br/><br/>
        <label className='user-profile-label'>Brief</label>
        <textarea className="user-profile-bio" onKeyDown={handleKeyDown} value={brief} onChange={(e) => setBrief(e.target.value)} placeholder={'Set brief dan espektasi untuk klien kalian Berapa kali revisi? apakah klien harus beri asset? payment full atau DP dulu?'} maxLength={500}/>
        <button className='btn-green' type='submit'>Save</button>
    </form>
    <Toaster/>
    </>
  )
}

export default ServiceForm