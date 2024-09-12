import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Detail() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate('/');
    }
  });
  
  return (
    <span>{location.state.title}</span>
  );
}

export default Detail;