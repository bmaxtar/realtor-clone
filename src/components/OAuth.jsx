import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import React from 'react'
import { FcGoogle } from "react-icons/fc"
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { db } from '../Firebase'


export default function OAuth() {
  const navigate = useNavigate()

  const onGoogleClick = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)
      if (!docSnap.exists) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/")
      toast.success("Auhtentification with is successful")
    } catch (error) {
      toast.error("Couldn't authorize with Google", error)
    }
  }

  return (
    <button className='flex items-center justify-center w-full
     bg-red-700 text-white px-7 py-3 uppercase text-sm font-semibold
     hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg
     active:shadow-lg transition duration-150 ease-in-out rounded'
      onClick={onGoogleClick}
    >
      <FcGoogle className='text-2xl bg-white rounded-full mr-2' />
      Continue with Google
    </button>
  )
}
