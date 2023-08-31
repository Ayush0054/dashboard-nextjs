"use client"
import React from 'react'
import ToggleSwitch from './toggleSwitch'
import { signIn, signOut, useSession } from "next-auth/react";
function Header() {
  const { data: session } = useSession();
  return (
   
           <div className=" flex items-center justify-start gap-4 mb-8">
            {session && session.user &&
              <h1 className="font-bold">Hey {session.user.name} -</h1>
            }
            <h1 className=" text-slate-400">here’s what’s happening </h1>
            <div>
              <ToggleSwitch />
            </div>
            <h1 className=" font-semibold text-slate-700 text-xl">DEMO DATA</h1>
          </div>
   
  )
}

export default Header
