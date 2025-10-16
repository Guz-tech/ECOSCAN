import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContex.jsx';
import './WelcomeBanner.css';

function WelcomeBanner() {
  const { user } = useAuth();
  const [show, setShow] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
   
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 4500); 


    const hideTimer = setTimeout(() => {
      setShow(false);
    }, 5000); 
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []); 
  
 
  if (!user || !show) {
    return null;
  }


  const bannerClassName = `welcome-banner ${isExiting ? 'exiting' : ''}`;

  return (
    <div className={bannerClassName}>
      <div className="container">
        <p>Bem-vindo de volta, <strong>{user.name}!</strong></p>
      </div>
    </div>
  );
}

export default WelcomeBanner;