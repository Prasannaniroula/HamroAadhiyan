import React, { use, useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function Forgorpassword() {
    const[email, setEmail]= useState('')
    const {backendUrl}= useContext(AppContext);
    const onSubmitHandler= async (e)=>{
      e.preventDefualt();
      try{
        const {data} = await axios.post(`${backendUrl}/api/auth/forgot-password`,{email});
        if(data.success){
            toast.success("Successfully send otp to your gmail")
            navigate('/resetpassword')
        }
      }
      catch (error) {
            toast.error(error.response?.data?.message || error.message || "Something went wrong");
          }

    }
  return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-pink-200 p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Forgot Password</h2>
    
            <form className="space-y-4" onSubmit={onSubmitHandler}>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter your Email"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-pink-300 outline-none"
                required
              />
    
              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-semibold transition duration-200"
              >
                Send Otp
              </button>
            </form>
            </div>
          </div>
      );
}

export default Forgorpassword