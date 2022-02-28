import Link from 'next/link';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import {UserContext} from '../lib/context'

// Top navbar
export default function Navbar() {
  const { user, username } = useContext(UserContext)

  const router = useRouter();

  const signOut =  () => {
    auth.signOut();
    router.reload();
  }

  return (
    <nav className="navbar">
      <ul>
          
        <li>
          <Link href="/">
            <button className="btn-logo">kreatif</button>
          </Link>
        </li>
        {/* user is signed-in and has username */}
        {username && (
          <>
           <li className="push-left">
              <button onClick={signOut}>Sign Out</button>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL} />
              </Link>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
            <>
            <li>
          <Link href="/">
            <button className="btn-navbar">How It Works</button>
          </Link>
        </li>
        <li>
          <Link href="/">
            <button className="btn-navbar">Showcase</button>
          </Link>
        </li>
          <li>
            <Link href="/auth">
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
          </>
        )}
      </ul>
    </nav>
  );
}