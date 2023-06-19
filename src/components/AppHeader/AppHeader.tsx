import React from 'react';
import { logoText } from '../../utils/constants.util';
import './AppHeader.scss';

function AppHeader() {
  return (
    <header className="app-header">
      <h1 className="app-logo">{logoText}</h1>
    </header>
  );
}
export default AppHeader;
