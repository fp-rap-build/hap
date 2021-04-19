import React from 'react';

import { useParams } from 'react-router-dom';

import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

const { Dragger } = Upload;

const DocumentUploader = ({ request, setDocuments }) => {
  const token = localStorage.getItem('token');
  const { id } = useParams();

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
        getAllDocuments(id, setDocuments);

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

const getAllDocuments = async (requestId, setDocuments) => {
  try {
    let res = await axiosWithAuth().get(`/requests/${requestId}/documents`);

    let allDocuments = res.data.documents;

    setDocuments(allDocuments);
  } catch (error) {
    message.error('unable to fetch all documents');
  }
};

export default DocumentUploader;
