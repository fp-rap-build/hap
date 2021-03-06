import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import styles from '../../../styles/pages/request.module.css';

import { useParams } from 'react-router-dom';
import { axiosWithAuth } from '../../../api/axiosWithAuth';

import DocumentUploader from './components/RequestInformation/components/DocumentUploader';
import LoadingComponent from '../../common/LoadingComponent';
import RequestInformation from './components/RequestInformation';
import RequestManager from './components/RequestManager';

import { message } from 'antd';

export default function Index() {
  const { organizationId } = useSelector(state => state.user.currentUser);

  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState({
    id: undefined,
    requestStatus: '',
    email: '',
  });

  const [documents, setDocuments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [ages, setAges] = useState([]);
  const [users, setUsers] = useState([]);

  const { id } = useParams();

  // Personal note, split this up #TODO

  const fetchData = async () => {
    setLoading(true);

    try {
      let requestInfo = await axiosWithAuth().get(`/requests/${id}`);

      let requestDocuments = await axiosWithAuth().get(
        `/requests/${id}/documents`
      );

      let orgPrograms = await axiosWithAuth().get(
        `/orgs/${requestInfo.data.request.orgId}/programs`
      );

      let receivedAges = await axiosWithAuth().get(
        `/ages/user/${requestInfo.data.request.userId}`
      );

      let usersData = await axiosWithAuth().get('/users/staff');

      setAges(receivedAges.data);
      setRequest(requestInfo.data.request);
      setDocuments(requestDocuments.data.documents);
      setPrograms(orgPrograms.data.programs);
      setUsers(usersData.data.staff);
    } catch (error) {
      message.error('Unable to fetch request');
    } finally {
      setLoading(false);
    }
  };

  const changeStatusToInReview = async () => {
    if (request.requestStatus === 'received') {
      setRequest({ ...request, requestStatus: 'inReview' });
      try {
        await axiosWithAuth().put(`/requests/${request.id}`, {
          requestStatus: 'inReview',
          email: request.email,
        });
      } catch (error) {
        message.error('Unable to update request status');
      }
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    changeStatusToInReview();
    // eslint-disable-next-line
  }, [request]);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className={styles.container}>
      <RequestManager request={request} users={users} setRequest={setRequest} />
      <RequestInformation
        request={request}
        setRequest={setRequest}
        documents={documents}
        setDocuments={setDocuments}
        organizationId={organizationId}
        programs={programs}
        setPrograms={setPrograms}
        ages={ages}
      />
      <DocumentUploader setDocuments={setDocuments} request={request} />
    </div>
  );
}
