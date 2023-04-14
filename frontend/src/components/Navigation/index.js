import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { Modal } from '../../context/Modal'
import LoginForm from '../LoginFormModal/LoginForm';
import SignupFormPage from '../SignupFormPage';
import SearchBar from '../Search';
import Carousel from '../Spots/carousel/carousel';
import items from '../Spots/carousel/icons';
import './Navigation.css';


function Navigation() {

  const sessionUser = useSelector(state => state.session.user);

  const [showModal, setShowModal] = useState(false)
  const [login, setLogin] = useState(true)


  return (
    <div className="navBar">
      <div>
        <div className="nav-container">
          <a href="/" className="home"><span>BnB</span></a>
          <div className="search-bar-container">
            <SearchBar />
          </div>
          <ProfileButton
            user={sessionUser}
            setLogin={setLogin}
            setShowModal={setShowModal}
          />
        </div>
      </div>
      <Carousel items={items} />
      {
        showModal &&
        <Modal
          onClose={() => setShowModal(false)}>
          {login ? <LoginForm setShowModal={setShowModal} /> :
            <SignupFormPage setShowModal={setShowModal} />}
        </Modal>
      }
    </div>
  )
}
export default Navigation;
