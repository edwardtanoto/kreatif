import { auth,firestore, googleAuthProvider } from '../lib/firebase';
import { UserContext, UserFormContext } from '../lib/context';
import { useForm } from 'react-hook-form';

import { useEffect, useState, useCallback, useContext } from 'react';
import debounce from 'lodash.debounce';
import Title from '../components/Title';
import OptionCard from '../components/OptionCard'

const AuthPage = () => {
  const { user, username } = useContext(UserContext)
  return (
    <main>
      {user ? !username ? <>
      <Title title={`Hello, welcome aboard.`}/>
      <UsernameForm />
      </> : <CreatorComponent /> :  <SignInButton />}
  </main>
  )
}

function CreatorComponent (){
    const { username } = useContext(UserContext)
    return (
        <>
        <Title title={'Apakah kamu'} />
        <div className='middle'>
            <OptionCard title={'Ingin membuat profile kreatif.'} href={`/${username}`} image={'/freelance.png'}/>
        <div>
        <OptionCard title={'Ingin memulai project/ mencari talent.'} href={'/showcase'} image={'/rocket.png'}/>
        </div>
        </div>
        </>
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
  
// Username form
function UsernameForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [userName, setUserName] = useState('');

    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const { user, username } = useContext(UserContext);
    const {userform} = useContext(UserFormContext);

    useEffect(() => {
        if(userform) setUserName(userform);
    }, [userform])
    
    const onSubmitOnboarding = async (e) => {
        e.preventDefault();
  
        // Create refs for both documents
        const userDoc = firestore.doc(`users/${user.uid}`);
        const usernameDoc = firestore.doc(`usernames/${userName}`);
    
        // Commit both docs together as a batch write.
        const batch = firestore.batch();
        batch.set(userDoc, { 
            username: userName, 
            photoURL: user.photoURL, 
            displayName: user.displayName, 
            firstName: e.target.firstName.value,
            secondName: e.target.secondName.value, 
            employmentType: e.target.employmentType.value, 
            jobTitle: e.target.jobTitle.value,
            company: e.target.company.value,
            city: e.target.city.value, 
            country: e.target.country.value, 
         
        });
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
          <div>
          <form onSubmit={onSubmitOnboarding}>
            <div className='onboarding-form'>
              <label>Username</label>
            <input name="username" placeholder={!userform ? 'kreatif.app/nama' : `${userform}`} value={userName} onChange={onChange} />
            </div>
            <UsernameMessage username={userName} isValid={isValid} loading={loading} />
          
            {/* <button type='submit' className='btn-green'>Confirm</button> */}
 
          <div className='onboarding-form'>
          <label>Nama Depan</label>
            <input type="text" placeholder="First name" {...register('firstName', { minLength: { value: 2, message: "First Name is too short" }, required: {value:true, message:"Nama Depan kosong, mohon diisi."} })} />
            {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
      </div>
      <div className='onboarding-form'>
          <label>Nama Belakang</label>
          <input type="text" placeholder="Last name" {...register('secondName', { minLength: { value: 2, message: "Second Name is too short" } , required: {value:true, message:"Nama Belakang kosong, mohon diisi." }})} />
          {errors.secondName && <p className="text-danger">{errors.secondName.message}</p>}
      </div>
      <div className='onboarding-form'>
          <label>Employment Type</label>
        <select {...register('employmentType', { minLength: { value: 2, message: "Employment Type is too short" } })}>
        <option value="Full-Time">Full-Time</option>
        <option value="Part-Time">Part-Time</option>
        <option value="Self-Employed">Self-Employed</option>
        <option value="Freelance">Freelance</option>
        <option value="Contract">Contract</option>
        <option value="Internship">Internship</option>
        <option value="Apprenticeship">Apprenticeship</option>
      </select>
      {errors.employmentType && <p className="text-danger">{errors.employmentType.message}</p>}
      </div>
      <div className='onboarding-form'>
          <label>Job Title</label>
      <select {...register("jobTitle", { required: true })}>
        <option value="UI/UX Design">UI/UX Design</option>
        <option value="Graphic Design">Graphic Design</option>
        <option value="Software Developer">Software Developer</option>
        <option value="Software Engineer">Software Engineer</option>
        <option value="Web Developer">Web Developer</option>
        <option value="App Developer">App Developer</option>
        <option value="Digital Marketing">Digital Marketing</option>
        <option value="Others">Others</option>
      </select>
      </div>
      <div className='onboarding-form'>
          <label>Perusahaan</label>
          <input type="text" placeholder="Google" {...register("company",  { minLength: { value: 2, message: "Masukkan Perusahaan yang tepat." } , required: {value:true, message:"Perusahaan anda kosong, mohon diisi." }})} />
          {errors.company && <p className="text-danger">{errors.company.message}</p>}
      </div>
      <div className='onboarding-form'>
          <label>Kota</label>
          <input type="text" placeholder="Jakarta" {...register("city", { minLength: { value: 2, message: "Masukkan Kota yang tepat." } , required: {value:true, message:"Mohon diisi Kota asal." }})} />
          {errors.city && <p className="text-danger">{errors.city.message}</p>}
      </div>
      <div className='onboarding-form'>
          <label>Negara</label>
          <input type="text" placeholder="Indonesia" {...register("country", { minLength: { value: 2, message: "Masukkan Negara yang tepat." } , required: {value:true, message:"Mohon diisi Negara asal." }})} />
          {errors.country && <p className="text-danger">{errors.country.message}</p>}
      </div>
      <button type='submit' className='btn-green'>Confirm</button>
    </form>
  
           
          </div> 
         
        </section>
      )
    );
  }
  
  function UsernameMessage({ username, isValid, loading }) {
    if (loading) {
      return <p>Checking...</p>;
    } else if (isValid) {
      return <p className="text-success">kreatif.app/{username} tersedia untuk anda.</p>;
    } else if (username.length < 3 && !isValid) {
        return <p className="text-danger">Jumlah username harus diatas angka tiga.</p>;
    } else if (username && !isValid) {
      return <p className="text-danger">Username tersebut telah diambil.</p>;
    } else {
      return <p></p>;
    }
  }

export default AuthPage