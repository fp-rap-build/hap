import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import styles from '../../../styles/pages/request.module.css';

import { useParams } from 'react-router-dom';
import { axiosWithAuth } from '../../../api/axiosWithAuth';

import DocumentUploader from './components/RequestInformation/components/DocumentUploader';
import LoadingComponent from '../../common/LoadingComponent';
import RequestInformation from './components/RequestInformation';
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

  const { id } = useParams();

  const fetchRequest = async () => {
    setLoading(true);

    try {
      let requestInfo = await axiosWithAuth().get(`/requests/${id}`);

      let requestDocuments = await axiosWithAuth().get(
        `/requests/${id}/documents`
      );

      let orgPrograms = await axiosWithAuth().get(
        `/orgs/${requestInfo.data.request.orgId}/programs`
      );

      setRequest(requestInfo.data.request);
      setDocuments(requestDocuments.data.documents);
      setPrograms(orgPrograms.data.programs);
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
    fetchRequest();
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
      <RequestInformation
        request={request}
        setRequest={setRequest}
        documents={documents}
        setDocuments={setDocuments}
        organizationId={organizationId}
        programs={programs}
        setPrograms={setPrograms}
      />
      <DocumentUploader setDocuments={setDocuments} request={request} />
    </div>
  );
}
