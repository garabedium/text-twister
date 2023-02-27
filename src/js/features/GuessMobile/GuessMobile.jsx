import React from 'react';

import './GuessMobile.scss';
import Button from '../../components/Button/Button';
import { Icons } from '../../utils/constants';

function GuessMobile({ userGuess, handleBackspace }) {
  return (
    <div className="mobile-guess">
      <div className="mobile-letters">
        {userGuess}
      </div>

      <Button
        className="btn--backspace"
        onClick={() => handleBackspace()}
        icon={`${Icons.delete} ri-3x`}
        disabled={userGuess?.length === 0}
      />
    </div>
  );
}

export default GuessMobile;
