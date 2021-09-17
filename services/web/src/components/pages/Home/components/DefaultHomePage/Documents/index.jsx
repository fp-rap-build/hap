import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { buildDocumentStatuses } from '../../../../../../redux/requests/requestActions';

import DocumentsTable from './DocumentsTable';

import { Typography } from 'antd';

const { Title } = Typography;

export default function Index({ request }) {
  //Grab documents and build statuses object for table
  let documents = useSelector(state => state.requests.documents);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(buildDocumentStatuses(documents));
  }, []);

  return (
    <div className="documentsContainer" style={{ padding: '2%' }}>
      <div className="documentStatuses">
        <Title level={4}>Document Statuses:</Title>
        <h2>
          Please submit all documents in this table, your request will start
          being processed shortly after all documents have been submitted
        </h2>
        <DocumentsTable request={request} />
      </div>
    </div>
  );
}
