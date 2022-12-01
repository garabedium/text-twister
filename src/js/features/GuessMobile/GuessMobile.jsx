import React from 'react';

import './GuessMobile.scss';
import Button from '../../components/Button/Button';

function GuessMobile(props){

  const { guess, handleBackspace } = props;
  const buttonClass = `btn--backspace ${guess.length === 0 ? 'disabled' : ''}`

  return(
    <div className="mobile-guess">
      <div className="mobile-letters">
        {guess}
      </div>

      <Button
        class={buttonClass}
        handleClick={() => handleBackspace()}
        icon='ri-delete-back-2-line ri-3x'
      />  
    </div>
  )
    
  }
  
  export default GuessMobile;