import React from 'react';

import {  useSelector } from 'react-redux';
import PrivateApp from './PrivateApp';
import PublicApp from './PublicApp';
import Alert from '../components/alert';


const App =() => {
  const { user } = useSelector(state => state.authentication);
  return (
    <div>

        <Alert/>
        {user ? <PrivateApp/> : <PublicApp />}
    </div>
  );
}

export default App;
