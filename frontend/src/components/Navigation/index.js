import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { Modal } from '../../context/Modal'
import LoginForm from '../LoginFormModal/LoginForm';
import SignupFormPage from '../SignupFormPage';
import SearchBar from '../Search';
import './Navigation.css';


function Navigation({ isLoaded }) {

  const history = useHistory()

  const sessionUser = useSelector(state => state.session.user);

  const [showModal, setShowModal] = useState(false)
  const [login, setLogin] = useState(true)

  const handleHomeClick = (e) => {
    e.preventDefault()
    history.push('/')
  }

  return (
    <ul className="navBar">

      <div onClick={handleHomeClick}className="navBar-left" >
        <img src="https://www.freeiconspng.com/uploads/bedroom-icon-7.png"
          alt="Bedroom Vector Png"
          style={{ filter: "invert(43%) sepia(81%) saturate(3997%) hue-rotate(326deg) brightness(98%) contrast(109%)" }} />
        <span>BnB</span>
      </div>

      <div className="search-bar-container">
        <SearchBar />
      </div>
      <div className="navBar-right">
        <li>
          {isLoaded && <ProfileButton
            user={sessionUser}
            setLogin={setLogin}
            setShowModal={setShowModal}
          />}
        </li>
        {
          showModal &&
          <Modal
            onClose={() => setShowModal(false)}>
            {login ? <LoginForm setShowModal={setShowModal} /> :
              <SignupFormPage setShowModal={setShowModal} />}
          </Modal>
        }
      </div>
    </ul>
  );
}

export default Navigation;
