
import React, { useState } from 'react';
import Portal from '../Swirl/Portal'; 
import logoVideo from '../../media/Logo Vedio.mp4'; 
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';
import { useGoogleAuth } from '../../hooks/useGoogleAuth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {loading, login} = useLogin();
  //handling login
  const handleSubmit = async(event) => {
    event.preventDefault();
    await login(email, password);
  };
  // handling googleOAuth
  const {authenticateWithGoogle} = useGoogleAuth();
      const handleGoogleAuth= async ()=>{
        await authenticateWithGoogle("/api/auth/google/callback")
      }

  return (
    <div className="relative flex items-center justify-center  min-h-screen bg-dark-blue">
      <Portal />
      <div className=" sm:w-1/4 sm:inset-y-0 sm:left-0 sm:flex sm:flex-col sm:rounded-lg sm:shadow-md  sm:bg-red ">
        <div className="w-full max-w-md p-8 space-y-3 ">
          <div className="flex justify-center mb-4">
            <video src={logoVideo} autoPlay loop muted className="w-24 h-24 rounded-full " />
          </div>
          <h2 className="text-2xl font-bold text-center blue">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="block text-blue text-sm font-bold ">
                <span className="label-text">E-mail</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full rounded-md bg-white bg-opacity-20 placeholder-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="block text-blue text-sm font-bold ">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full rounded-md bg-white bg-opacity-20 placeholder-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-full rounded-lg">Login</button>
          </form>
        </div>
        <div className="flex flex-col justify-between items-start w-full h-full ml-10">
                <div className=" flex flex-row item-center justify-between ">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mb-4 w-full flex items-center justify-center" onClick={handleGoogleAuth}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64" height="64" viewBox="0 0 64 64">
<radialGradient id="95yY7w43Oj6n2vH63j6HJa_fQDK2sCN4Eh1_gr1" cx="31.998" cy="34.5" r="30.776" gradientTransform="matrix(1 0 0 -1 0 66)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f4e9c3"></stop><stop offset=".219" stop-color="#f8eecd"></stop><stop offset=".644" stop-color="#fdf4dc"></stop><stop offset="1" stop-color="#fff6e1"></stop></radialGradient><path fill="url(#95yY7w43Oj6n2vH63j6HJa_fQDK2sCN4Eh1_gr1)" d="M63.97,30.06C63.68,32.92,61.11,35,58.24,35H53c-1.22,0-2.18,1.08-1.97,2.34	c0.16,0.98,1.08,1.66,2.08,1.66h3.39c2.63,0,4.75,2.28,4.48,4.96C60.74,46.3,58.64,48,56.29,48H51c-1.22,0-2.18,1.08-1.97,2.34	c0.16,0.98,1.08,1.66,2.08,1.66h3.39c1.24,0,2.37,0.5,3.18,1.32C58.5,54.13,59,55.26,59,56.5c0,2.49-2.01,4.5-4.5,4.5h-44	c-1.52,0-2.9-0.62-3.89-1.61C5.62,58.4,5,57.02,5,55.5c0-3.04,2.46-5.5,5.5-5.5H14c1.22,0,2.18-1.08,1.97-2.34	C15.81,46.68,14.89,46,13.89,46H5.5c-2.63,0-4.75-2.28-4.48-4.96C1.26,38.7,3.36,37,5.71,37H13c1.71,0,3.09-1.43,3-3.16	C15.91,32.22,14.45,31,12.83,31H4.5c-2.63,0-4.75-2.28-4.48-4.96C0.26,23.7,2.37,22,4.71,22h9.79c1.24,0,2.37-0.5,3.18-1.32	C18.5,19.87,19,18.74,19,17.5c0-2.49-2.01-4.5-4.5-4.5h-6c-1.52,0-2.9-0.62-3.89-1.61S3,9.02,3,7.5C3,4.46,5.46,2,8.5,2h48	c3.21,0,5.8,2.79,5.47,6.06C61.68,10.92,60.11,13,57.24,13H55.5c-3.04,0-5.5,2.46-5.5,5.5c0,1.52,0.62,2.9,1.61,3.89	C52.6,23.38,53.98,24,55.5,24h3C61.71,24,64.3,26.79,63.97,30.06z"></path><linearGradient id="95yY7w43Oj6n2vH63j6HJb_fQDK2sCN4Eh1_gr2" x1="29.401" x2="29.401" y1="4.064" y2="106.734" gradientTransform="matrix(1 0 0 -1 0 66)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ff5840"></stop><stop offset=".007" stop-color="#ff5840"></stop><stop offset=".989" stop-color="#fa528c"></stop><stop offset="1" stop-color="#fa528c"></stop></linearGradient><path fill="url(#95yY7w43Oj6n2vH63j6HJb_fQDK2sCN4Eh1_gr2)" d="M47.46,15.5l-1.37,1.48c-1.34,1.44-3.5,1.67-5.15,0.6c-2.71-1.75-6.43-3.13-11-2.37	c-4.94,0.83-9.17,3.85-11.64,7.97l-8.03-6.08C14.99,9.82,23.2,5,32.5,5c5,0,9.94,1.56,14.27,4.46	C48.81,10.83,49.13,13.71,47.46,15.5z"></path><linearGradient id="95yY7w43Oj6n2vH63j6HJc_fQDK2sCN4Eh1_gr3" x1="12.148" x2="12.148" y1=".872" y2="47.812" gradientTransform="matrix(1 0 0 -1 0 66)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#feaa53"></stop><stop offset=".612" stop-color="#ffcd49"></stop><stop offset="1" stop-color="#ffde44"></stop></linearGradient><path fill="url(#95yY7w43Oj6n2vH63j6HJc_fQDK2sCN4Eh1_gr3)" d="M16.01,30.91c-0.09,2.47,0.37,4.83,1.27,6.96l-8.21,6.05c-1.35-2.51-2.3-5.28-2.75-8.22	c-1.06-6.88,0.54-13.38,3.95-18.6l8.03,6.08C16.93,25.47,16.1,28.11,16.01,30.91z"></path><linearGradient id="95yY7w43Oj6n2vH63j6HJd_fQDK2sCN4Eh1_gr4" x1="29.76" x2="29.76" y1="32.149" y2="-6.939" gradientTransform="matrix(1 0 0 -1 0 66)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#42d778"></stop><stop offset=".428" stop-color="#3dca76"></stop><stop offset="1" stop-color="#34b171"></stop></linearGradient><path fill="url(#95yY7w43Oj6n2vH63j6HJd_fQDK2sCN4Eh1_gr4)" d="M50.45,51.28c-4.55,4.07-10.61,6.57-17.36,6.71C22.91,58.2,13.66,52.53,9.07,43.92l8.21-6.05	C19.78,43.81,25.67,48,32.5,48c3.94,0,7.52-1.28,10.33-3.44L50.45,51.28z"></path><linearGradient id="95yY7w43Oj6n2vH63j6HJe_fQDK2sCN4Eh1_gr5" x1="46" x2="46" y1="3.638" y2="35.593" gradientTransform="matrix(1 0 0 -1 0 66)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#155cde"></stop><stop offset=".278" stop-color="#1f7fe5"></stop><stop offset=".569" stop-color="#279ceb"></stop><stop offset=".82" stop-color="#2cafef"></stop><stop offset="1" stop-color="#2eb5f0"></stop></linearGradient><path fill="url(#95yY7w43Oj6n2vH63j6HJe_fQDK2sCN4Eh1_gr5)" d="M59,31.97c0.01,7.73-3.26,14.58-8.55,19.31l-7.62-6.72c2.1-1.61,3.77-3.71,4.84-6.15	c0.29-0.66-0.2-1.41-0.92-1.41H37c-2.21,0-4-1.79-4-4v-2c0-2.21,1.79-4,4-4h17C56.75,27,59,29.22,59,31.97z"></path>
</svg>
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mb-4 w-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64" height="64" viewBox="0 0 64 64">
<radialGradient id="nT5WH7nXAOiS46rXmee3Oa_msQ6HdxpqUmi_gr1" cx="33.34" cy="27.936" r="43.888" gradientTransform="matrix(1 0 0 -1 0 66)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f4e9c3"></stop><stop offset=".219" stop-color="#f8eecd"></stop><stop offset=".644" stop-color="#fdf4dc"></stop><stop offset="1" stop-color="#fff6e1"></stop></radialGradient><path fill="url(#nT5WH7nXAOiS46rXmee3Oa_msQ6HdxpqUmi_gr1)" d="M51.03,37.34c0.16,0.98,1.08,1.66,2.08,1.66h5.39c2.63,0,4.75,2.28,4.48,4.96	C62.74,46.3,60.64,48,58.29,48H49c-1.22,0-2.18,1.08-1.97,2.34c0.16,0.98,1.08,1.66,2.08,1.66h8.39c1.24,0,2.37,0.5,3.18,1.32	C61.5,54.13,62,55.26,62,56.5c0,2.49-2.01,4.5-4.5,4.5h-49c-1.52,0-2.9-0.62-3.89-1.61C3.62,58.4,3,57.02,3,55.5	C3,52.46,5.46,50,8.5,50H14c1.22,0,2.18-1.08,1.97-2.34C15.81,46.68,14.89,44,13.89,44H5.5c-2.63,0-4.75-2.28-4.48-4.96	C1.26,36.7,3.36,35,5.71,35H8c1.71,0,3.09-1.43,3-3.16C10.91,30.22,9.45,29,7.83,29H4.5c-2.63,0-4.75-2.28-4.48-4.96	C0.26,21.7,2.37,20,4.71,20H20c0.83,0,1.58-0.34,2.12-0.88C22.66,18.58,23,17.83,23,17c0-1.66-1.34-3-3-3h-1.18	c-0.62-0.09-1.43,0-2.32,0h-9c-1.52,0-2.9-0.62-3.89-1.61S2,10.02,2,8.5C2,5.46,4.46,3,7.5,3h49c3.21,0,5.8,2.79,5.47,6.06	C61.68,11.92,60.11,14,57.24,14H52c-2.76,0-5,2.24-5,5c0,1.38,0.56,2.63,1.46,3.54C49.37,23.44,50.62,24,52,24h6.5	c3.21,0,5.8,2.79,5.47,6.06C63.68,32.92,61.11,35,58.24,35H53C51.78,35,50.82,36.08,51.03,37.34z"></path><linearGradient id="nT5WH7nXAOiS46rXmee3Ob_msQ6HdxpqUmi_gr2" x1="32" x2="32" y1="-3.34" y2="59.223" gradientTransform="matrix(1 0 0 -1 0 66)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#155cde"></stop><stop offset=".278" stop-color="#1f7fe5"></stop><stop offset=".569" stop-color="#279ceb"></stop><stop offset=".82" stop-color="#2cafef"></stop><stop offset="1" stop-color="#2eb5f0"></stop></linearGradient><path fill="url(#nT5WH7nXAOiS46rXmee3Ob_msQ6HdxpqUmi_gr2)" d="M58,32c0,13.35-10.05,24.34-23,25.83C34.02,57.94,33.01,58,32,58c-1.71,0-3.38-0.17-5-0.49	C15.03,55.19,6,44.65,6,32C6,17.64,17.64,6,32,6S58,17.64,58,32z"></path><path fill="#fff" d="M42.8,36.05l-0.76,2C41.6,39.22,40.46,40,39.19,40H35v17.83C34.02,57.94,33.01,58,32,58	c-1.71,0-3.38-0.17-5-0.49V40h-2.95C22.36,40,21,38.66,21,37v-2c0-1.66,1.36-3,3.05-3H27v-6c0-5.51,4.49-10,10-10h3	c2.21,0,4,1.79,4,4s-1.79,4-4,4h-3c-1.1,0-2,0.9-2,2v6h4.95C42.08,32,43.55,34.09,42.8,36.05z"></path>
</svg>
                 
                </button>
                </div>
                <div className="flex-1 p-4 ">
                    <p className="text-sm text-blue font-bold"> New User?  <Link to= '/signup' className="text-red-500">Sign Up</Link></p>
                </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
