import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DefaultHomePage from './components/DefaultHomePage';

function RenderHomePage(props) {
  const currentUser = useSelector(state => state.user.currentUser);
  console.debug(currentUser.role);
  switch (currentUser.role) {
    case 'admin':
      return <Redirect to="/admin" />;
    case 'orgAdmin':
      return <Redirect to="/admin" />;
    case 'programManager':
      return <Redirect to="/program_manager" />;
    case 'assistantProgramManager':
      return <Redirect to="/program_manager" />;
    case 'landlord':
      return <Redirect to="/landlord" />;
    default:
      return <DefaultHomePage />;
  }
}

export default RenderHomePage;
