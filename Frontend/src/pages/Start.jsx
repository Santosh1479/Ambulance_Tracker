import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8 bg-gray-100">
      <h1 className="text-4xl font-bold">Welcome to Ambulance Tracking System</h1>
      <div className="flex gap-6">
        <Link to="/login">
          <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-lg">
            Ambulance Login
          </button>
        </Link>
        <Link to="/police-login">
          <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-lg">
            Police Login
          </button>
        </Link>
        <Link to="/user">
          <button className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl text-lg">
            User
          </button>
        </Link>
      </div>
    </main>
  )
}

export default Start