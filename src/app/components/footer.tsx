import React from 'react'
import SettingsIcon from './icons/settings'
import LogoutIcon from './icons/logout'
import QuestionIcon from './icons/question'
import { signOut } from 'next-auth/react'

function Footer() {
  return (
    <div className=' flex justify-between  m-28 '>
      

        <div className=" grid gap-4 ">
      <button className=" flex items-center gap-2">
        <SettingsIcon />
        <h1>Settings</h1>
      </button>
      <button className=" flex items-center gap-2" onClick={() => signOut()}>
        <LogoutIcon />
        <h1>Logout</h1>
      </button>
    </div>
    <QuestionIcon />
      
    </div>
  )
}

export default Footer
