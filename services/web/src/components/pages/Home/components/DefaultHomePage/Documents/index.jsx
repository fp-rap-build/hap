import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

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
const initialStatuses = {
  residency: 'missing',
  income: 'missing',
  housingInstability: 'missing',
  covid: 'missing',
};

export default function Index({ request, documentStatuses }) {
  return (
    <div className="documentsContainer" style={{ padding: '2%' }}>
      <div className="documentStatuses">
        <Title level={4}>Document Statuses:</Title>
        <DocumentsTable documentStatuses={documentStatuses} />
      </div>
      <Divider />
      <div className="">
        <Title level={4}>Document Uploader</Title>
      </div>
    </div>
  );
}
