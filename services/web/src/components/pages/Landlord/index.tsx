import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../../common/LoadingComponent';

import { fetchCurrentUser } from '../../../redux/users/userActions';
import { fetchMultiRequests } from '../../../redux/requests/requestActions';

import ActiveRequestsTable from './components/ActiveRequestsTable';

export default function Index() {
  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.global.isLoading);
  const currentUser = useSelector(state => state.user.currentUser);

  useEffect(() => {
    dispatch(fetchMultiRequests({ landlordEmail: currentUser.email }));
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {isLoading && <LoadingComponent />}
      {!isLoading && <ActiveRequestsTable />}
    </>
  );
}
