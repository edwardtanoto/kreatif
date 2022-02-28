// UI component for userdata profile
import Link from 'next/link'
import {useState, useContext, useEffect} from 'react'
import { firestore,auth } from '../lib/firebase';
import { UserContext } from '../lib/context';
import toast, {Toaster} from 'react-hot-toast';
import UserProfileDetail from './UserProfileDetail';

export default function UserProfile({ userdata }) {
    const [bio, setBio] = useState('')
    const [textAreaLength, setTextAreaLength] = useState(bio.length)
    const onChange = (e) => {
        setTextAreaLength(e.target.value.length)
        setBio(e.target.value)
    };
    useEffect(()=>{
        setBio(userdata.bio)
        setTextAreaLength(userdata.bio?.length)
    },[])

    const handleKeyDown = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight + 20}px`; 
    }

    const userRef = firestore.collection('users').doc(auth?.currentUser?.uid);

    const onSubmit = async (e) => {
        e.preventDefault();

        await userRef.update({
            bio:bio,
        });

          toast.success('Post updated successfully!')
      };
    const { user: currentUser, username } = useContext(UserContext);
    const uid = auth?.currentUser?.uid
    
    return (
        <>
              { currentUser?.uid !== uid ? (
            <main>
            <div>
            <h1>{userdata.displayName}</h1>
            <form onSubmit={onSubmit}>
            <label className='user-profile-label'>Tulis Bio</label>
            <textarea className="user-profile-bio" onKeyDown={handleKeyDown} value={bio} onChange={onChange} placeholder={'Write your bio.'} maxLength={140}/>
            <p className='subtitle'>{textAreaLength}/140</p>
            <button type='submit'>Save</button>
            </form>
            <Toaster
      position="top-center"
      reverseOrder={false}
    />
    <h1>Create Case Studies</h1>
    <Link href="/admin">
        <button className='btn-green'>New</button>
    </Link>
     
          </div>
        </main>) : 
        <>
        <UserProfileDetail user={userdata}/>
        </>}
       
        </>
 
        
       
     
    );
  }