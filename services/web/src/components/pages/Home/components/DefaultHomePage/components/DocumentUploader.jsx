import React from 'react';

import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const DocumentUploader = ({ request }) => {
  const token = localStorage.getItem('token');

  const props = {
    headers: {
      authorization: `Bearer ${token}`,
    },
    name: 'document',
    multiple: true,
    action: `${process.env.REACT_APP_API_URI}/requests/${request?.id}/documents`,
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div style={{ width: '100%', marginBottom: '3rem' }}>
      <Dragger
        style={{ width: '100%' }}
        {...props}
        className="upload-list-inline"
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
      </Dragger>
    </div>
  );
};

export default DocumentUploader;
