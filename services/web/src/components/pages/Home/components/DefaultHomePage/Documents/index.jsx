import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import DocumentsTable from './DocumentsTable';

import { Typography, Divider } from 'antd';
const { Title, Paragraph } = Typography;

//

//If they opt out pop out a modal that reads the form with a I Acknowledge etc. etc
// toggle status to optOut
//If docs good toggles status to received
//------------------------------------------------
//For status/ category trackingn handle on FE
//Write a list of the four categories - get all docs for the request
// show x/4 received, x/4 optOut, x/4 missing

export default function Index({ request }) {
  let documents = useSelector(state => state.requests.documents);

  const buildStatuses = docs => {
    const stats = {};
    docs.forEach(doc => {
      stats[doc.category] = doc.status;
    });
    return stats;
  };

  const [statuses, setStatuses] = useState(buildStatuses(documents));
  console.log(statuses);

  return (
    <div className="documentsContainer" style={{ padding: '2%' }}>
      <div className="documentStatuses">
        <Title level={4}>Document Statuses:</Title>
        <DocumentsTable
          documentStatuses={statuses}
          request={request}
          setDocumentStatuses={setStatuses}
        />
      </div>
    </div>
  );
}
