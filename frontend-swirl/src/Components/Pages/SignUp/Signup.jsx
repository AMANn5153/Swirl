import { useState } from "react"
import React  from 'react'
import Portal from "../Swirl/Portal";
import logoVideo from '../../media/Logo Vedio.mp4'; 
import useSignup from "../../hooks/useSignup";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";

const Signup = () => {

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
        gender : "Male"
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      
      const changeGender = () => {
        setFormData({...formData, gender: formData.gender === "Male" ? "Female" : "Male"});
      };

      const {loading, signup} = useSignup();

      const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(formData);
      };

      const {authenticateWithGoogle} = useGoogleAuth();
      const handleGoogleAuth= async ()=>{
        await authenticateWithGoogle("/api/auth/google/callback")
      }
    

  return (
    <>
    <div className="relative flex items-center justify-center  min-h-screen ">
      <Portal />
      <div className=" md:h-3/4 md:flex  md:flex-row md:justify-around md:items-center w-3/4   sm:flex sm:flex-col sm:max-m-sm ">
      <div className="flex flex-col justify-between items-center w-full h-1/4 ">
        <div className="m-5 flex flex-col justify-around items-center ">
            <video src={logoVideo} autoPlay loop muted className="w-24 h-24 rounded-full" />
            <h1 className="font-semibold text-2xl font-bold text-center blue">Sign Up</h1>
        </div>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-2">
          <label htmlFor="username" className="block text-blue text-sm font-bold ">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your Email"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="name" className="block text-blue text-sm font-bold ">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="block text-blue text-sm font-bold ">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="confirmPassword" className="block text-blue text-sm font-bold ">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Confirm your password"
            required
          />
        </div>
        <div>
            <label className="label cursor-pointer">
                <p className={formData.gender === "Male"? "label font-bold text-primary":"label font-bold text-pink-500"}>{formData.gender}</p> 
                <input type="checkbox" className="toggle toggle-primary" checked={formData.gender === 'Female'} onChange={changeGender}/>
            </label>    
        </div>
        <div className="flex items-center m-5 justify-between">
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn rounded-xl btn-primary hover:text-blue font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
    {/* the google singin div */}
        <div className="flex flex-col justify-between items-center w-full h-full ">
                <div className=" flex flex-row item-center justify-between glass-effect">
                <button onClick={handleGoogleAuth} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mb-4 w-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64" height="64" viewBox="0 0 64 64">
<radialGradient id="95yY7w43Oj6n2vH63j6HJa_fQDK2sCN4Eh1_gr1" cx="31.998" cy="34.5" r="30.776" gradientTransform="matrix(1 0 0 -1 0 66)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f4e9c3"></stop><stop offset=".219" stop-color="#f8eecd"></stop><stop offset=".644" stop-color="#fdf4dc"></stop><stop offset="1" stop-color="#fff6e1"></stop></radialGradient><path fill="url(#95yY7w43Oj6n2vH63j6HJa_fQDK2sCN4Eh1_gr1)" d="M63.97,30.06C63.68,32.92,61.11,35,58.24,35H53c-1.22,0-2.18,1.08-1.97,2.34	c0.16,0.98,1.08,1.66,2.08,1.66h3.39c2.63,0,4.75,2.28,4.48,4.96C60.74,46.3,58.64,48,56.29,48H51c-1.22,0-2.18,1.08-1.97,2.34	c0.16,0.98,1.08,1.66,2.08,1.66h3.39c1.24,0,2.37,0.5,3.18,1.32C58.5,54.13,59,55.26,59,56.5c0,2.49-2.01,4.5-4.5,4.5h-44	c-1.52,0-2.9-0.62-3.89-1.61C5.62,58.4,5,57.02,5,55.5c0-3.04,2.46-5.5,5.5-5.5H14c1.22,0,2.18-1.08,1.97-2.34	C15.81,46.68,14.89,46,13.89,46H5.5c-2.63,0-4.75-2.28-4.48-4.96C1.26,38.7,3.36,37,5.71,37H13c1.71,0,3.09-1.43,3-3.16	C15.91,32.22,14.45,31,12.83,31H4.5c-2.63,0-4.75-2.28-4.48-4.96C0.26,23.7,2.37,22,4.71,22h9.79c1.24,0,2.37-0.5,3.18-1.32	C18.5,19.87,19,18.74,19,17.5c0-2.49-2.01-4.5-4.5-4.5h-6c-1.52,0-2.9-0.62-3.89-1.61S3,9.02,3,7.5C3,4.46,5.46,2,8.5,2h48	c3.21,0,5.8,2.79,5.47,6.06C61.68,10.92,60.11,13,57.24,13H55.5c-3.04,0-5.5,2.46-5.5,5.5c0,1.52,0.62,2.9,1.61,3.89	C52.6,23.38,53.98,24,55.5,24h3C61.71,24,64.3,26.79,63.97,30.06z"></path><linearGradient id="95yY7w43Oj6n2vH63j6HJb_fQDK2sCN4Eh1_gr2" x1="29.401" x2="29.401" y1="4.064" y2="106.734" gradientTransform="matrix(1 0 0 -1 0 66)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ff5840"></stop><stop offset=".007" stop-color="#ff5840"></stop><stop offset=".989" stop-color="#fa528c"></stop><stop offset="1" stop-color="#fa528c"></stop></linearGradient><path fill="url(#95yY7w43Oj6n2vH63j6HJb_fQDK2sCN4Eh1_gr2)" d="M47.46,15.5l-1.37,1.48c-1.34,1.44-3.5,1.67-5.15,0.6c-2.71-1.75-6.43-3.13-11-2.37	c-4.94,0.83-9.17,3.85-11.64,7.97l-8.03-6.08C14.99,9.82,23.2,5,32.5,5c5,0,9.94,1.56,14.27,4.46	C48.81,10.83,49.13,13.71,47.46,15.5z"></path><linearGradient id="95yY7w43Oj6n2vH63j6HJc_fQDK2sCN4Eh1_gr3" x1="12.148" x2="12.148" y1=".872" y2="47.812" gradientTransform="matrix(1 0 0 -1 0 66)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#feaa53"></stop><stop offset=".612" stop-color="#ffcd49"></stop><stop offset="1" stop-color="#ffde44"></stop></linearGradient><path fill="url(#95yY7w43Oj6n2vH63j6HJc_fQDK2sCN4Eh1_gr3)" d="M16.01,30.91c-0.09,2.47,0.37,4.83,1.27,6.96l-8.21,6.05c-1.35-2.51-2.3-5.28-2.75-8.22	c-1.06-6.88,0.54-13.38,3.95-18.6l8.03,6.08C16.93,25.47,16.1,28.11,16.01,30.91z"></path><linearGradient id="95yY7w43Oj6n2vH63j6HJd_fQDK2sCN4Eh1_gr4" x1="29.76" x2="29.76" y1="32.149" y2="-6.939" gradientTransform="matrix(1 0 0 -1 0 66)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#42d778"></stop><stop offset=".428" stop-color="#3dca76"></stop><stop offset="1" stop-color="#34b171"></stop></linearGradient><path fill="url(#95yY7w43Oj6n2vH63j6HJd_fQDK2sCN4Eh1_gr4)" d="M50.45,51.28c-4.55,4.07-10.61,6.57-17.36,6.71C22.91,58.2,13.66,52.53,9.07,43.92l8.21-6.05	C19.78,43.81,25.67,48,32.5,48c3.94,0,7.52-1.28,10.33-3.44L50.45,51.28z"></path><linearGradient id="95yY7w43Oj6n2vH63j6HJe_fQDK2sCN4Eh1_gr5" x1="46" x2="46" y1="3.638" y2="35.593" gradientTransform="matrix(1 0 0 -1 0 66)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#155cde"></stop><stop offset=".278" stop-color="#1f7fe5"></stop><stop offset=".569" stop-color="#279ceb"></stop><stop offset=".82" stop-color="#2cafef"></stop><stop offset="1" stop-color="#2eb5f0"></stop></linearGradient><path fill="url(#95yY7w43Oj6n2vH63j6HJe_fQDK2sCN4Eh1_gr5)" d="M59,31.97c0.01,7.73-3.26,14.58-8.55,19.31l-7.62-6.72c2.1-1.61,3.77-3.71,4.84-6.15	c0.29-0.66-0.2-1.41-0.92-1.41H37c-2.21,0-4-1.79-4-4v-2c0-2.21,1.79-4,4-4h17C56.75,27,59,29.22,59,31.97z"></path>
</svg>
                </button>
              
                </div>
                <div className="flex-1 p-4 glass-effect">
                    <p className="text-sm text-blue-700 font-bold"> Already a user?  <Link to="/login" className="text-red-500">Login</Link></p>
                </div>
        </div>
    </div>

    </div>
  </>
  )
}

export default Signup