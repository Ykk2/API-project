import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import { Modal } from '../../context/Modal'
import LoginForm from '../LoginFormModal/LoginForm';
import SignupFormPage from '../SignupFormPage';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false)
  const [login, setLogin] = useState(true)

  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (
  //     <ProfileButton user={sessionUser} />
  //   );
  // } else {
  //   sessionLinks = (
  //     <>
  //       <LoginFormModal />
  //       <NavLink to="/signup">Sign Up</NavLink>
  //     </>
  //   );
  // }

  return (
    <ul className="navBar">
      <div>
        <a href="https://www.freeiconspng.com/img/8765">
          <img src="https://www.freeiconspng.com/uploads/flickr-logo-png-1.png" width="100"></img>
        </a>
      </div>
      <div className="navBar-right">
      <li>
        <NavLink exact to="/">Home</NavLink>
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
      {login ? <LoginForm setShowModal={setShowModal}/>:
               <SignupFormPage setShowModal={setShowModal}/>}
      </Modal>
      }
      </div>
    </ul>
  );
}

export default Navigation;
