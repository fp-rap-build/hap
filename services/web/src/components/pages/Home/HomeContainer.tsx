import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../../common/LoadingComponent';
import RenderHomePage from './RenderHomePage';
import { fetchCurrentUser } from '../../../redux/users/userActions';
import { fetchNotifications } from '../../../redux/notifications/notificationActions';
import { setRequestAddressAndDocuments } from '../../../redux/requests/requestActions';

function HomeContainer() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.global.isLoading);

  useEffect(() => {
    // Populate our store with the necessary information
    dispatch(fetchCurrentUser());
    dispatch(fetchNotifications());
    dispatch(setRequestAddressAndDocuments());
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
