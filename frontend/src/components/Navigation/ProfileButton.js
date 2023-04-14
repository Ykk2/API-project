// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './Navigation.css';

function ProfileButton({ user, setLogin, setShowModal }) {

  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    dispatch(sessionActions.logout());
  };

  return (

    <button className="profile-button" onClick={openMenu}>
      <i className="fa-solid fa-bars" />
      <i className="fas fa-user-circle" />
      {showMenu && (user ?
        (<ul className="profile-dropdown">
          <nav>
            <Link to={'/host'}>
              <span>Host</span>
            </Link>
            <Link to={`/bookings/${user.username}`}>
              <span>Trips</span>
            </Link>
            <Link to={`/listings/${user.username}`}>
              <span>Listings</span>
            </Link>
            <Link to={'/about/bnb'}>
              <span>About</span>
            </Link>
          </nav>
          <a href="/" onClick={logout}>Log out</a>

        </ul>) :
        (<ul className="profile-dropdown">

          <a className="login" onClick={() => {
            setLogin(true)
            setShowModal(true)
          }}>Log in</a>

          <a onClick={() => {
            setLogin(false)
            setShowModal(true)
          }}>Sign up</a>

        </ul>)
      )}
    </button>


  );
}

export default ProfileButton;
