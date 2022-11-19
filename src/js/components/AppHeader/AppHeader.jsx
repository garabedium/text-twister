import React from 'react';
import './AppHeader.scss';

function AppHeader() {

  const logoText = "Text Twister".split('').map((char, i) => {
    return (<span key={i}>{char}</span>)
  })

  return (
    <header className="app-header">
      <h1 className="app-logo">{logoText}</h1>
    </header>    
  )
}
export default AppHeader;
