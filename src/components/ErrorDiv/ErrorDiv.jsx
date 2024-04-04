import React, { useEffect, useState } from 'react';
import './ErrorDiv.css';

function ErrorDiv(props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(props.visible);
  }, [props.visible]);

  const handleButtonClick = () => {
    setIsVisible(false);
  };

  return (
    <div className={`animated-div ${isVisible ? 'visible' : ''}`}>
      <button onClick={handleButtonClick}><i class="bi bi-x-circle-fill"></i></button>
      <div className='texto'><span>{props.text}</span></div>
    </div>
  );
}

export default ErrorDiv;
