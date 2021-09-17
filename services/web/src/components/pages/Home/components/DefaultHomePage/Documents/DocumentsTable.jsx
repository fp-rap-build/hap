import { useState } from 'react';

import { useSelector } from 'react-redux';

import buildTableData from './utils/buildTableData';

import UploadDocModal from './modals/UploadDocModal';
import SelfDecModal from './modals/SelfDecModal';

import { InfoCircleOutlined, MinusOutlined } from '@ant-design/icons';
import { Tag, Table, Button, Typography } from 'antd';
import checkIfAllDocumentsInCategoryAreDenied from './utils/checkIfAllDocumentsInCategoryAreDenied';

const { Text } = Typography;

const DocumentsTable = ({ request }) => {
  const storeStatuses = useSelector(state => state.requests.documentStatuses);

  const { documents } = useSelector(state => state.requests);

  const [tableData, setTableData] = useState(buildTableData(storeStatuses));

  const updateLocalStatuses = (tableData, inputCategory, newStatus) => {
    const newTableData = tableData.map(documentRow => {
      if (documentRow.category === inputCategory) {
        return { ...documentRow, status: newStatus };
      } else {
        return documentRow;
      }
    });

    setTableData(newTableData);
  };

  const [uploadModalVisibility, setUploadModalVisibility] = useState(false);
  const [selfDecModalVisibility, setSelfDecModalVisibility] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('');

  //Handle close and ok of modals
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

  //cancel for both modals
  const handleCancel = () => {
    setSelectedCategory('');
    setUploadModalVisibility(false);
    setSelfDecModalVisibility(false);
  };

  const validStatuses = {
    received: 1,
    verified: 1,
    actionsRequired: 1,
    denied: 1,
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
      render: (status, row, index) => {
        let color = status in validStatuses ? 'success' : 'error';
        let text = status in validStatuses ? 'Received' : 'Missing';

        let allDocumentsInCategoryAreDenied = checkIfAllDocumentsInCategoryAreDenied(
          documents,
          row.category
        );

        if (status === 'optOut') {
          color = 'warning';
          text = 'Self Declaration';
        } else if (allDocumentsInCategoryAreDenied) {
          color = 'warning';
          text = 'denied';
        }

        return (
          <Tag
            color={color}
            style={{
              fontSize: '1rem',
              width: '8rem',
              textAlign: 'center',
              padding: '3% 0',
            }}
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
          <Button onClick={() => showUploadModal(record)}>
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
          <Button
            disabled={record.selfDecDisabled}
            onClick={() => showSelfDecModal(record)}
          >
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
    handleSelfDecAccept,
    selfDecModalVisibility,
    tableData,
    setTableData,
    updateLocalStatuses,
  };

  return (
    <div className="documentsTable">
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        expandable={{
          expandedRowRender: record => (
            <Text type="secondary">{record.blurb}</Text>
          ),
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <MinusOutlined
                onClick={e => onExpand(record, e)}
                style={{ color: '#1890FF' }}
              />
            ) : (
              <InfoCircleOutlined
                onClick={e => onExpand(record, e)}
                style={{ color: '#1890FF' }}
              />
            ),
        }}
      />
      <UploadDocModal {...props} />
      <SelfDecModal {...props} />
    </div>
  );
};

export default DocumentsTable;
