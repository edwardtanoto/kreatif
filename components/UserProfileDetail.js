import Link from 'next/link'
import AuthCheck from './AuthCheck'

const UserProfileDetail = ({user}) => {
  return (
    <div className='user-profile-detail'>
        <img src={user.photoURL} className="card-img-center" />
        <h1> {user.displayName}</h1>
        <h3>{user.jobTitle} based in {user.country}</h3>
        <p>{user.bio}</p>
        <AuthCheck
          fallback={
            <Link href="/auth" className='middle'>
              <button>Hubungi {user.firstName}</button>
            </Link>
          }
        >
          <p>Chat with me</p>
        </AuthCheck>
    </div>
  )
}

export default UserProfileDetail