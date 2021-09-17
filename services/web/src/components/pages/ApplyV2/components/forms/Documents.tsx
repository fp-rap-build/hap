import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { axiosWithAuth } from '../../../../../api/axiosWithAuth';

import { buildDocumentStatuses } from '../../../../../redux/requests/requestActions';
import { setCurrentUser } from '../../../../../redux/users/userActions';

import DocumentsTable from '../../../Home/components/DefaultHomePage/Documents/DocumentsTable';

import { Button } from 'antd';

export default function Documents({
  allDocumentsSubmitted,
  currentUser,
  dispatch,
  setCurrentContent,
}) {
  const request = useSelector(state => state.requests.request);

  const documents = useSelector(state => state.requests.documents);

  const isLoading = useSelector(state => state.global.isLoading);

  useEffect(() => {
    dispatch(buildDocumentStatuses(documents));
  }, [documents]);

  if (isLoading) return <h1>Loading</h1>;

  return (
    <div>
      <DocumentsTable request={request} />
      <Button
        disabled={!allDocumentsSubmitted}
        style={{ margin: '5px' }}
        size="large"
        onClick={() =>
          updateUserApplicationStep(currentUser, dispatch, setCurrentContent)
        }
      >
        Next
      </Button>
    </div>
  );
}

const updateUserApplicationStep = (
  currentUser,
  dispatch,
  setCurrentContent
) => {
  if (currentUser.applicationStep === 'documents') {
    axiosWithAuth()
      .put('/users/me', { applicationStep: 'review' })
      .then(res => {
        dispatch(setCurrentUser(res.data.user));
      });
  }
  setCurrentContent('review');
};
