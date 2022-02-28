import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// const myLoader = ({ src, width, quality }) => {
//     return `https://localhost:3000/${src}?w=${width}&q=${quality || 75}`
//   }

const OptionCard = ({title, href,image}) => {
  return (
   <Link href={href}>
   <div className='option-card'>
   <Image src={image} width={500}
   alt={title}
      height={500}/> 
       <h2>{title}</h2>
   </div>
   </Link>
  )
}

export default OptionCard