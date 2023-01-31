import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSpotForm from './EditSpotForm';


function EditSpotModal({showModal, setShowModal, spot}) {


  return (
    <div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpotForm spot={spot} setShowModal={setShowModal}/>
        </Modal>
      )}
    </div>
  );
}

export default EditSpotModal;
