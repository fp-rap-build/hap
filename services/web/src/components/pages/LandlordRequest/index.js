import { useState, useEffect } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { axiosWithAuth } from '../../../api/axiosWithAuth';

import RequestInfo from './components/RequestInfo';
import Documents from './components/Documents';
import CommentsContainer from './components/CommentsContainer';

import { Card, Typography, Button } from 'antd';

const { Title } = Typography;

const tabList = [
  { key: 'information', tab: 'Request Information' },
  { key: 'documents', tab: 'Documents' },
  { key: 'comments', tab: 'Comments' },
];

export default function Index() {
  const { id } = useParams();

  const history = useHistory();

  let currentUser = useSelector(state => state.user.currentUser);

  let initalRequest = useSelector(state => state.requests.requests).filter(
    request => request.id === parseInt(id)
  );

  const [request, setRequest] = useState(initalRequest[0]);

  const [currentTab, setCurrentTab] = useState('information');

  const [requestDocuments, setRequestDocuments] = useState([]);

  const onTabChange = (key, type) => {
    setCurrentTab(key);
  };

  const fetchDocuments = async () => {
    try {
      const documents = await axiosWithAuth()
        .get(`/requests/${request.id}/documents`)
        .then(res => res.data.documents);

      setRequestDocuments(documents);
    } catch (error) {
      console.log('Error fetching Documents', error);
    }
  };

  useEffect(() => {
    fetchDocuments();
    //eslint-disable-next-line
  }, []);

  const props = { request, currentTab, currentUser, requestDocuments };

  return (
    <div>
      <Card
        tabList={tabList}
        activeTabKey={currentTab}
        onTabChange={onTabChange}
        title={
          <Title level={3}>
            {request.firstName} {request.lastName}'s Request
          </Title>
        }
        extra={[
          <Button type="primary" onClick={() => history.push('/landlord')}>
            Return To Dash
          </Button>,
        ]}
      >
        {renderContent(props)}
      </Card>
    </div>
  );
}

const renderContent = props => {
  switch (props.currentTab) {
    case 'information':
      return <RequestInfo {...props} />;
    case 'documents':
      return <Documents {...props} />;
    case 'comments':
      return <CommentsContainer {...props} />;
    default:
      return <RequestInfo {...props} />;
  }
};
