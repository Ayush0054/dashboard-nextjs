"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
const SigninButton = () => {
  const { push } = useRouter();
  const { data: session } = useSession();
  const handleClick = (event) => {
    event.preventDefault();
    signIn();
  };

  return (
    <div className=" flex justify-center items-center">
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-10">
            {/*header*/}

            <button
              onClick={handleClick}
              className="rounded-lg border bg-white border-gray-300 hover:bg-gray-200 p-2 pl-3 pr-3 flex items-center justify-center gap-2"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default SigninButton;
