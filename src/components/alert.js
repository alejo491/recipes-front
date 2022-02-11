import React, { useEffect, useState } from 'react';

import {  useSelector } from 'react-redux';
import Toast from 'react-bootstrap/Toast';


const Alert =() => {
  const alert = useSelector(state => state.alert);
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if(alert.message){
        setShow(true)
    }
    if(alert.error){
        setShowError(true)
    }
  },[alert])

  return (
    <>
        <Toast onClose={() => setShow(false)} show={show} autohide delay={2000}>
            <Toast.Body>{alert.message}</Toast.Body>
        </Toast>
        <Toast onClose={() => setShowError(false)} show={showError} autohide delay={2000} bg={'warning'}>
            <Toast.Body>{alert.error}</Toast.Body>
        </Toast>
    </>
  );
}

export default Alert;
