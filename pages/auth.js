import { auth,firestore, googleAuthProvider } from '../lib/firebase';
import { UserContext, UserFormContext } from '../lib/context';

import { useEffect, useState, useCallback, useContext } from 'react';
import debounce from 'lodash.debounce';
import Title from '../components/Title';

const AuthPage = () => {
  const { user, username } = useContext(UserContext)
  const {userform} = useContext(UserFormContext);
  return (
    <main>
      {user ? !username ? <>
      <Title title={'Onboarding'}/>
      <UsernameForm />
      </> : <SignOutButton /> :  <SignInButton />}
  </main>
  )
}

// Sign in with Google button
function SignInButton() {
    const signInWithGoogle = async () => {
      await auth.signInWithPopup(googleAuthProvider);
    };
  
    return (
        <>
        <Title title={'Join Our Community'}/>
        <p className='subtitle'>Kreatif adalah project karya anak bangsa untuk meningkatkan SDM kreatif Indonesia.</p>
    <div className='middle'>
     
      <button className="btn-google" onClick={signInWithGoogle}>
        <img src={'/google.png'} /> Sign in with Google
      </button>
      </div>
      </>
    );
  }
  
  // Sign out button
  function SignOutButton() {
    return <button onClick={() => auth.signOut()}>Sign Out</button>;
  }  
  
// Username form
function UsernameForm() {
    const [userName, setUserName] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const { user, username } = useContext(UserContext);
    const {userform} = useContext(UserFormContext);

    useEffect(() => {
        if(userform) setUserName(userform);
    }, [userform])
    
  
    const onSubmit = async (e) => {
      e.preventDefault();
  
      // Create refs for both documents
      const userDoc = firestore.doc(`users/${user.uid}`);
      const usernameDoc = firestore.doc(`usernames/${userName}`);
  
      // Commit both docs together as a batch write.
      const batch = firestore.batch();
      batch.set(userDoc, { username: userName, photoURL: user.photoURL, displayName: user.displayName });
      batch.set(usernameDoc, { uid: user.uid });
  
      await batch.commit();
    };
  
    const onChange = (e) => {
      // Force form value typed in form to match correct format
      
      let val = e.target.value.toLowerCase();
      const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  
      // Only set form value if length is < 3 OR it passes regex
      if (val.length < 3) {
        setUserName(val);
        setLoading(false);
        setIsValid(false);
      }
  
      if (re.test(val)) {
        setUserName(val);
        setLoading(true);
        setIsValid(false);
      }
    };
  
    //
  
    useEffect(() => {
      checkUsername(userName);
    }, [userName]);
  
    // Hit the database for username match after each debounced change
    // useCallback is required for debounce to work
    const checkUsername = useCallback(
      debounce(async (username) => {
        if (username.length >= 3) {
          const ref = firestore.doc(`usernames/${username}`);
          const { exists } = await ref.get();
          console.log('Firestore read executed!');
          setIsValid(!exists);
          setLoading(false);
        }
      }, 500),
      []
    );
  
    return (
      !username && (
        <section>
        
        <label>Choose Username</label>
        <br/>
        <br/>
          <div>
          <form onSubmit={onSubmit} className='username-form'>
              <label className='middle'>kreatif.app/</label>
              
            <input className='middle' name="username" placeholder={!userform ? 'myname' : `${userform}`} value={userName} onChange={onChange} />
            
           
            {/* <h3>Debug State</h3>
            <div>
              Username: {userName}
              <br />
              Loading: {loading.toString()}
              <br />
              Username Valid: {isValid.toString()}
            </div> */}
            <button type='submit' className='btn-green'>Confirm</button>
          </form>
          
         <br/>
          <input className='middle' name="firstname" value={userName} onChange={onChange} />
          <input className='middle' name="second name" value={userName} onChange={onChange} />
          <input className='middle' name="firstname" value={userName} onChange={onChange} />
          <input className='middle' name="work" value={userName} onChange={onChange} />
          <input className='middle' name="lokasi" value={userName} onChange={onChange} />
          <input className='middle' name="budget" value={userName} onChange={onChange} />
              
  
           
          </div> <UsernameMessage username={userName} isValid={isValid} loading={loading} />
         
        </section>
      )
    );
  }
  
  function UsernameMessage({ username, isValid, loading }) {
    if (loading) {
      return <p>Checking...</p>;
    } else if (isValid) {
      return <p className="text-success">{username} is available!</p>;
    } else if (username.length < 3 && !isValid) {
        return <p className="text-danger">Username must have more than 3 length</p>;
    } else if (username && !isValid) {
      return <p className="text-danger">That username is taken!</p>;
    } else {
      return <p></p>;
    }
  }

export default AuthPage