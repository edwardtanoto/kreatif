import Link from 'next/link';
import { useContext } from 'react';

import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import {UserContext} from '../lib/context'
import { CgProfile, CgLogIn } from "react-icons/cg";
import { IoHomeOutline ,IoAddSharp} from "react-icons/io5";
import { BiGroup } from "react-icons/bi";
import { VscSignOut } from "react-icons/vsc";

// Top navbar
export default function BottomBar() {
  const { user, username } = useContext(UserContext)
  const router = useRouter();

  const signOut =  () => {
    auth.signOut();
    router.reload();
  }

  return (
      <div>
    <nav className="navbar">
      <ul>
        {/* user is signed-in and has username */}
        {username && (
          <>
              <li>
          <Link href="/">
            <button className="btn-navbar icon-bottombar"><IoHomeOutline size='1.3rem'/></button>
          </Link>
        </li>
        <li>
          <Link href="/admin">
            <button className="btn-navbar icon-bottombar"><IoAddSharp size='1.3rem'/></button>
          </Link>
        </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL} referrerPolicy={'no-referrer'} alt="Profile"/>
              </Link>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
            <>
            <li>
          <Link href="/">
            <button className="btn-navbar icon-bottombar"><IoHomeOutline size='1.3rem'/></button>
          </Link>
        </li>
        <li>
          <Link href="/">
            <button className="btn-navbar" ><BiGroup size='1.3rem'/></button>
          </Link>
        </li>
          <li>
            <Link href="/auth">
              <button className="btn-navbar" ><CgLogIn  size='1rem'/></button>
            </Link>
          </li>
          </>
        )}
      </ul>
      
    </nav>
    </div>
  );
}