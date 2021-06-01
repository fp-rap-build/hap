import { Tag, Table, Button } from 'antd';

import builtTableData from './buildTableData';

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
];

const DocumentsTable = ({ documentStatuses }) => {
  const tableData = builtTableData(documentStatuses);
  console.log(tableData);

  return (
    <div className="documentsTable">
      <Table columns={columns} dataSource={tableData} />
    </div>
  );
};

export default DocumentsTable;
