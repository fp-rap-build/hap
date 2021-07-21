import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import RequestInfo from './components/RequestInfo';
import Documents from './components/Documents';

import { Card } from 'antd';

const tabList = [
  { key: 'information', tab: 'Request Information' },
  { key: 'documents', tab: 'Documents' },
  { key: 'comments', tab: 'Comments' },
];

export default function Index() {
  const { id } = useParams();

  // console.log(parseInt(useSelector(state => state.requests.requests[0].id)));

  let initalRequest = useSelector(state => state.requests.requests).filter(
    request => request.id === parseInt(id)
  );

  const [request, setRequest] = useState(initalRequest[0]);

  const [currentTab, setCurrentTab] = useState('information');

  const onTabChange = (key, type) => {
    setCurrentTab(key);
  };

  const props = { request, currentTab };

  return (
    <div>
      <Card
        tabList={tabList}
        activeTabKey={currentTab}
        onTabChange={onTabChange}
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
      return <Documents />;
    case 'comments':
      return null;
    default:
      return <RequestInfo />;
  }
};
