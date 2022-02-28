import React from 'react'
import Link from 'next/link'

import { UserFormContext } from '../lib/context';
import { useUserData } from '../lib/hooks';

export const UsernameForm = ({onsubmit , onchange}) => {
  return (
   <>
   <form className='username-form' onSubmit={onsubmit}>
    <label className='middle'>kreatif.app/</label>
    <input className='middle' type="text" placeholder='nama' onChange={onchange}/>
    <button>Buat Akun</button>
    </form>
   </>
  )
}
