import React from 'react';
import './Navbar.css';

interface NavbarProps {
  balance: number; // balance prop to pass remaining balance
}

const Navbar: React.FC<NavbarProps> = ({ balance }) => {
    return (
      <div className="navbar">
        {/* Three bars icon and title */}
        <div className="navbar__left">
          <div className="navbar__menu-icon">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <div className="navbar__title">FUN88</div>
        </div>
  
        {/* Wallet icon, user icon, and balance */}
        <div className="navbar__icons">
          <div className="navbar__icon navbar__wallet-icon">💰</div>
          <div className="navbar__balance">₱{balance.toFixed(2)}</div>
          <div className="navbar__icon navbar__user-icon">👤</div>
        </div>
      </div>
    );
  };
  

export default Navbar;