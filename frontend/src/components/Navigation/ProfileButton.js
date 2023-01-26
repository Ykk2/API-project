// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './Navigation.css';

function ProfileButton({ user, setLogin, setShowModal }) {

  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()

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
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <div className="profile-button-container">
      <button className="profile-button" onClick={openMenu}>
        <i className="fas fa-user-circle" />

      </button>
      {showMenu && ( user ?
        (<ul className="profile-dropdown">
          <div id="profile-drop-down-divide">
          <li>{user.username}</li>
          <li >{user.email}</li>
          </div>
          <Link to={'/host'}>
            <span>Host</span>
          </Link>
          <Link to={`/${user.username}/bookings`}>
            <span>Trips</span>
          </Link>
          <button className="logout" onClick={logout}>Log Out</button>

        </ul>) :
        (<ul className="profile-dropdown">

            <button className="login" onClick={() => {
              setLogin(true)
              setShowModal(true)
            }}>Log In</button>

            <button onClick={() => {
              setLogin(false)
              setShowModal(true)
            }}>Sign Up</button>

        </ul>)
      )}
    </div>
  );
}

export default ProfileButton;
