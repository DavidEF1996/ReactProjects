import React from 'react'

export default function Errors({children}: {children:React.ReactNode}) {
  return (
    <p className='text-center my-5 p-5 text-white uppercase text-sm bg-red-600 font-bold'>
        {children}
    </p>
  )
}
