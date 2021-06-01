import { useState } from 'react';

import { useSelector } from 'react-redux';

import buildTableData from './buildTableData';

import UploadDocModal from './modals/UploadDocModal';
import SelfDecModal from './modals/SelfDecModal';

import { Tag, Table, Button, Modal } from 'antd';

const DocumentsTable = ({ documentStatuses, request, setDocumentStatuses }) => {
  const tableData = buildTableData(documentStatuses);

  const [uploadModalVisibility, setUploadModalVisibility] = useState(false);
  const [selfDecModalVisibility, setSelfDecModalVisibility] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('');

  const showUploadModal = record => {
    setSelectedCategory(record.category);
    setUploadModalVisibility(true);
  };

  const showSelfDecModal = record => {
    setSelectedCategory(record.category);
    setSelfDecModalVisibility(true);
  };

  const handleSelfDecAccept = () => {
    setSelfDecModalVisibility(false);
  };

  const handleAcknowledge = () => {
    setSelectedCategory('');
    setUploadModalVisibility(false);
  };

  const handleCancel = () => {
    setSelectedCategory('');
    setUploadModalVisibility(false);
    setSelfDecModalVisibility(false);
  };

  const columns = [
    {
      title: 'Document Type',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      //Strange render rules in the docs
      render: (status, row, index) => {
        let color = status === 'received' ? 'success' : 'error';
        let text = status === 'received' ? 'Received' : 'Missing';

        if (status === 'optOut') {
          color = 'warning';
          text = 'Self Declaration';
        }

        return (
          <Tag
            color={color}
            style={
              status === 'optOut'
                ? { fontSize: '1rem', width: '8rem', textAlign: 'center' }
                : { fontSize: '1rem', width: '5rem', textAlign: 'center' }
            }
          >
            {text}
          </Tag>
        );
      },
    },
    {
      title: 'Provide Document',
      key: 'upload',
      render: (text, record) => (
        <>
          <Button
            disabled={record.status === 'received'}
            onClick={() => showUploadModal(record)}
          >
            Upload Document
          </Button>
        </>
      ),
    },
    {
      title: 'Self-Declaration',
      key: 'optOut',
      render: (text, record) => (
        <>
          <Button onClick={() => showSelfDecModal(record)}>
            Don't Have Document?
          </Button>
        </>
      ),
    },
  ];

  const props = {
    uploadModalVisibility,
    handleAcknowledge,
    handleCancel,
    selectedCategory,
    request,
    setDocumentStatuses,
    documentStatuses,
    handleSelfDecAccept,
    selfDecModalVisibility,
  };

  return (
    <div className="documentsTable">
      <Table columns={columns} dataSource={tableData} pagination={false} />
      <UploadDocModal {...props} />
      <SelfDecModal {...props} />
    </div>
  );
};

export default DocumentsTable;
