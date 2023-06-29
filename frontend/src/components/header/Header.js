import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';

export const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', '');
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">ContestNotifier</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link me-5" to="/contact">Contact</Link>
            </li>
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">Sign In</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <AccountCircleIcon/>
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/profile">Edit Profile</Link></li>
                <li><hr className="dropdown-divider"/></li>
                <li><Button variant="text" onClick={handleLogout}><LogoutIcon/> Logout</Button></li>
              </ul>
            </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
