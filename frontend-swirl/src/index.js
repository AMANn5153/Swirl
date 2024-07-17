import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './Components/Pages/Login/Login.jsx';
import Signup from './Components/Pages/SignUp/Signup.jsx';
import Swril from './Components/Pages/Swirl/Swril.jsx';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import PrivateRoute ,{SignupPrivateRoute} from './Components/private routes/PrivateRoute.jsx';
import { AuthUser } from './Components/context/AuthUser.jsx';
import { ToastContainer } from 'react-toastify';
import {SocketContextProvider} from './Components/context/SocketContext.jsx';

const router = createBrowserRouter([
  {
    path : '/Login',
    element : <SignupPrivateRoute><Login/></SignupPrivateRoute>
  },
  {
    path: '/signup',
    element :<SignupPrivateRoute><Signup/></SignupPrivateRoute> 
  },
  {
    path : '/',
    element : <PrivateRoute><Swril/></PrivateRoute>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthUser>
        <SocketContextProvider>
        <RouterProvider router={router}>

          <App />

        </RouterProvider>
        </SocketContextProvider>
        
      <ToastContainer/>
    </AuthUser>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
