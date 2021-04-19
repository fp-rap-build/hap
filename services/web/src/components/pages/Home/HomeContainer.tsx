import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../../common/LoadingComponent';
import RenderHomePage from './RenderHomePage';
import { fetchCurrentUser } from '../../../redux/users/userActions';

function HomeContainer() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.global.isLoading);

  useEffect(() => {
    // Set the current user in state

    dispatch(fetchCurrentUser());

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isLoading && <LoadingComponent />}

      {!isLoading && <RenderHomePage />}
    </>
  );
}

export default HomeContainer;
