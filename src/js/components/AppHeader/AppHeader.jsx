import React from 'react';
import { LogoText } from '../../utils/constants';
import './AppHeader.scss';

function AppHeader() {
  return (
    <header className="app-header">
      <h1 className="app-logo">{LogoText}</h1>
    </header>
  );
}
export default AppHeader;
