

import { useState, useEffect } from "react";
import { Flip, toast } from "react-toastify";
import { useAuthContext } from "../context/AuthUser.jsx";
import {useNavigate} from 'react-router-dom';

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const authenticateWithGoogle = () => {
    setLoading(true);
    const popup = window.open("/api/auth/google", '_self', 'width=600,height=600');
    
    if (!popup) {
      toast.error('Popup blocked. Please enable popups for this site.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });
      setLoading(false);
    }
  };

  // Handle the redirected response
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userParam = urlParams.get('user');
    const errorParam = urlParams.get('error');

    if (userParam) {
      try {
        const userData = JSON.parse(decodeURIComponent(userParam));
        localStorage.setItem('user-data', JSON.stringify(userData));
        setUser(userData);
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }

    if (errorParam) {
      toast.error(decodeURIComponent(errorParam), {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });
    }

    setLoading(false);
  }, [setUser]);

  return { loading, authenticateWithGoogle };
};
