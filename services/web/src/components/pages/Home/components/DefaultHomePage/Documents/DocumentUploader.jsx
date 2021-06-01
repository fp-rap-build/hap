import { useSelector } from 'react-redux';

import socket from '../../../../../../config/socket';

import { ConsoleSqlOutlined, InboxOutlined } from '@ant-design/icons';

import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

import { Upload, message } from 'antd';
const { Dragger } = Upload;

const DocumentUploader = ({
  request,
  category,
  setDocumentStatuses,
  documentStatuses,
}) => {
  const token = localStorage.getItem('token');

  const currentUser = useSelector(state => state.user.currentUser);

  const updateDoc = async name => {
    //Persist Changes on BE
    try {
      //Find document
      const newDoc = await axiosWithAuth()
        .post('/documents/name', { name: name })
        .then(res => res.data);
      //Update document category and status
      newDoc.category = category;
      newDoc.status = 'received';

      const updatedDoc = await axiosWithAuth()
        .put(`/documents/${newDoc.id}`, newDoc)
        .then(res => res.data);

      //Update local state to reflect new category status
      setDocumentStatuses({ ...documentStatuses, [category]: 'received' });
    } catch (error) {
      console.log(error);
    }
  };

  const props = {
    headers: {
      authorization: `Bearer ${token}`,
    },
    name: 'document',
    multiple: true,
    action: `${process.env.REACT_APP_API_URI}/requests/${request?.id}/documents`,
    onChange(info) {
      //Emit Notifications
      const { status } = info.file;
      if (status === 'done') {
        socket.emit('requestChange', {
          requestId: request.id,
          senderId: currentUser.id,
          message: `${currentUser.firstName} submitted a new document to their request`,
        });

        message.success(`${info.file.name} file uploaded successfully.`);

        //Update Document Status
        updateDoc(info.file.name);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div style={{ width: '100%', height: '5rem' }}>
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
