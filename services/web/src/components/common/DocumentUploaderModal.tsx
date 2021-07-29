
import { Modal, Typography } from 'antd';

import { Upload, message } from 'antd';

import { InboxOutlined } from '@ant-design/icons';
import { axiosWithAuth } from '../../api/axiosWithAuth';

const { Title } = Typography;

const UploadDocModal = ({
  isOpen,
  setIsOpen,
  request,
  setRequests,
  category,
}) => {
  const uploadUrl = `${process.env.REACT_APP_API_URI}/requests/${request.id}/documents`;

  const token = localStorage.getItem('token');

  const headers = {
    authorization: `Bearer ${token}`,
  };

  const onUploadFinish = async documents => {
    documents.forEach(doc => {
      doc['status'] = 'verified';

      axiosWithAuth()
        .put(`/documents/${doc.id}`, { category, status: 'verified' })
        .then(() => {
          setRequests(prevState =>
            prevState.map(req => {
              if (req.id === request.id) {
                req[category].push(doc);
              }

              return req;
            })
          );
        })
        .catch(err => {
          message.error('error updating document category');
        });
    });
  };

  return (
    <div className="uploadDocModal">
      <Modal
        title={<Title level={5}>Upload Document</Title>}
        style={{
          zIndex: 2000
        }}
        visible={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={() => setIsOpen(false)}
        bodyStyle={{ height: '30vh'}}
      >
        <Uploader
          actionUrl={uploadUrl}
          onFinish={onUploadFinish}
          headers={headers}
        />
      </Modal>
    </div>
  );
};

const Uploader = ({ actionUrl, headers, onFinish }) => {
  const { Dragger } = Upload;

  const props = {
    name: 'document',
    headers: headers,
    multiple: true,
    action: actionUrl,
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`Successfully uploaded document`);

        onFinish(info.file.response.documents);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
    </Dragger>
  );
};

export default UploadDocModal;
