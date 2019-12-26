import React from 'react';

function Header() {
  return (
    <header style= {headerStyle}>
      <h1> To Do List App </h1>
    </header>
  )
}

const headerStyle = {
  background: '#3CB371',
  color: 'white',
  textAlign: 'center',
  padding: '10px',
  fontFamily:"consolas"
}

export default Header;
