import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { db } from "../../Firebase";
import OAuth from '../../components/OAuth';

export default function Register() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const { name, email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth, email, password
      );
      updateProfile(auth.currentUser, {
        displayName: name
      });
      const user = userCredential.user;
      const FD = { ...formData };
      delete FD.password;
      FD.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), FD);
      toast.success("Sign up was successful");
      navigate("/")
    } catch (error) {
      toast.error("Something went wrong  during Registeration", error);
    }
  }

  return (
    <section>
      <h1 className="text-3xl text-center font-bold mt-6">Sign Up </h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className="md:w-[67%] lg:w-[50%] mb-12 mb:mb-6 ">
          <img src={require("../../images/key.jpeg")} alt="realtor-clone-app-login-img"
            className="w-full rounded-2xl"
          />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
            <input className='w-full px-4 py-2 mb-6 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
              type="text" id='name'
              placeholder='Full name'
              value={name} onChange={onChange}
            />
            <input className='w-full px-4 py-2 mb-6 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
              type="email" id='email'
              placeholder='Email address'
              value={email} onChange={onChange}
            />
            <div className="input-group-password relative mb-6">
              <input className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
                type={showPassword ? "text" : "password"} id='password'
                placeholder='Password'
                value={password} onChange={onChange}
              />
              {showPassword ? (
                <AiFillEyeInvisible className="input-icon absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : <AiFillEye className="input-icon absolute right-3 top-3 text-xl cursor-pointer"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
              }
            </div>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6' >Have an account ?
                <Link to="/login" className='text-red-600 hover:text-red-700
                 duration-200 ease-in-out ml-1'>
                  Sign In
                </Link>
              </p>
              <p>
                <Link to="/forgot-password" className='text-blue-600
                 hover:text-blue-800 duration-200 ease-in-out ml-1'>
                  Forgot password ?
                </Link>
              </p>
            </div>
            <button type="submit" className='w-full bg-blue-600 text-white px-7 py-3 text-sm 
          font-medium uppercase rounded shadow-md hover:bg-blue-700 transition ease-in-out duration-300
          hover:shadow-lg active:to-blue-800 active:duration-200'
            >
              Sign up
            </button>
            <div className='flex  items-center my-4 before:border-t  before:flex-1 before:border-gray-300
           after:border-t after:flex-1 after:border-gray-300'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div >
    </section >
  )
}
