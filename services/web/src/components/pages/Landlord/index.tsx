import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../../common/LoadingComponent';

import { fetchCurrentUser } from '../../../redux/users/userActions';

export default function Index() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.global.isLoading);

  return (
    <>
      {isLoading && <LoadingComponent />}
      {!isLoading && <ActiveRequestsTable />}
    </>
  );
}

const ActiveRequestsTable = () => {
  return (
    <div>
      <h1>Landlord Dash</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod sequi eos
        dolorum blanditiis excepturi ipsum saepe. Quia labore officia,
        doloremque aliquam ducimus aspernatur tempora, nesciunt laudantium
        corrupti nostrum cum distinctio.
      </p>
    </div>
  );
};
