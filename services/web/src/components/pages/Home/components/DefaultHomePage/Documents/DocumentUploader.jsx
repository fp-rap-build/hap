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
      const docs = await axiosWithAuth()
        .get(`/requests/${request.id}/documents`)
        .then(res => res.data.documents);

      const newDoc = docs.filter(doc => doc.name === name);
      // Update document category and status
      newDoc[0].category = category;
      newDoc[0].status = 'received';

      const updatedDoc = await axiosWithAuth()
        .put(`/documents/${newDoc[0].id}`, newDoc[0])
        .then(res => res.data);

      //Update local state to reflect new category status
      setDocumentStatuses({ ...documentStatuses, [category]: 'received' });
    } catch (error) {
      console.log('Error Updatind Doc');
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
