import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()

  function pathMathRoute(route) {
    if (route === location.pathname) {
      return true
    }
  }

  return (
    <div className='header bg-white border-b shadow-sm sticky top-0 z-50'>
      <header className='header-menu flex justify-between items-center px-3 max-w-6xl mx-auto'>
        <div className="header-menu logo-img">
          <img src={require('../images/logo.png')} alt="realtor-clone-app-with-react-app-logo" className='h-5 cursor-pointer' onClick={() => navigate("/")} />
        </div>
        <div className="menu-header">
          <ul className='header-menu-ul flex space-x-10'>
            <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/") && "text-black border-b-red-500"}`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/offers") && "text-black border-b-red-500"}`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/register") && "text-black border-b-red-500"}`}
              onClick={() => navigate("/register")}
            >
              Sign in
            </li>
          </ul>
        </div>
      </header>
    </div>
  )
}
