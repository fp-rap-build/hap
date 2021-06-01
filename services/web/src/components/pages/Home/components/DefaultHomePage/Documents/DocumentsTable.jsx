import { useState } from 'react';

import { useSelector } from 'react-redux';

import builtTableData from './buildTableData';

import DocumentUploader from './DocumentUploader';
import UploadDocModal from './modals/UploadDocModal';

import { Tag, Table, Button, Modal } from 'antd';

const DocumentsTable = ({ documentStatuses, request, setDocumentStatuses }) => {
  const tableData = builtTableData(documentStatuses);
  const documents = useSelector(state => state.requests.documents);

  const [uploadModalVisibility, setUploadModalVisibility] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const showUploadModal = record => {
    setSelectedCategory(record.category);
    setUploadModalVisibility(true);
  };

  const handleAcknowledge = () => {
    setSelectedCategory('');
    setUploadModalVisibility(false);
  };

  const handleCancel = () => {
    setSelectedCategory('');
    setUploadModalVisibility(false);
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
          text = 'Can not Provide Document';
        }

        return (
          <Tag
            color={color}
            style={{ fontSize: '1rem', width: '5rem', textAlign: 'center' }}
          >
            {text}
          </Tag>
        );
      },
    },
    {
      title: 'Upload',
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
      title: 'Dont Have',
      key: 'optOut',
      render: (text, record) => (
        <>
          <Button>Don't Have Document?</Button>
        </>
      ),
    },
  ];

  return (
    <div className="documentsTable">
      <Table columns={columns} dataSource={tableData} pagination={false} />
      <DocumentUploader request={request} />
      <UploadDocModal
        uploadModalVisibility={uploadModalVisibility}
        handleAcknowledge={handleAcknowledge}
        handleCancel={handleCancel}
        selectedCategory={selectedCategory}
        request={request}
        setDocumentStatuses={setDocumentStatuses}
        documentStatuses={documentStatuses}
      />
    </div>
  );
};

export default DocumentsTable;
