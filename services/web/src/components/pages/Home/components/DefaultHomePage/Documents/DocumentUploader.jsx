import { useSelector, useDispatch } from 'react-redux';

import socket from '../../../../../../config/socket';

import {
  buildDocumentStatuses,
  setDocuments,
} from '../../../../../../redux/requests/requestActions';

import { InboxOutlined } from '@ant-design/icons';

import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

import { Upload, message } from 'antd';
const { Dragger } = Upload;

const DocumentUploader = ({
  request,
  category,
  updateLocalStatuses,
  tableData,
}) => {
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');

  const currentUser = useSelector(state => state.user.currentUser);

  const updateDoc = async docId => {
    //Persist Changes on BE
    try {
      //Find document
      let docs = await axiosWithAuth()
        .get(`/requests/${request.id}/documents`)
        .then(res => res.data.documents);

      let newDoc = docs.filter(doc => doc.id === docId);

      // Update document category and status
      newDoc[0].category = category;
      newDoc[0].status = 'received';

      //PUT Changes

      await axiosWithAuth()
        .put(`/documents/${newDoc[0].id}`, newDoc[0])
        .then(res => res.data);

      //Update local state to reflect new category status
      updateLocalStatuses(tableData, category, 'received');

      let updatedDocs = await axiosWithAuth()
        .get(`/requests/${request.id}/documents`)
        .then(res => res.data.documents);

      dispatch(setDocuments(updatedDocs));

      dispatch(buildDocumentStatuses(tableData));

      // setDocumentStatuses({ ...documentStatuses, [category]: 'received' });
      // const newStatuses = { ...documentStatuses, [category]: 'received' };
    } catch (error) {
      console.log(error);
      console.log('Error Updating Doc');
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

        let documentId = info.file.response.documents[0].id;

        //persist changes in data base
        updateDoc(documentId);
      } else if (status === 'error') {
        if (info.file?.response?.errors) {
          message.error(info.file.response.errors.detail);
        } else {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    },
  };

  return (
    <div style={{ width: '100%' }}>
      <Dragger
        style={{ width: '100%', height: '15rem' }}
        {...props}
        className="upload-list-inline"
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </p>
      </Dragger>
    </div>
  );
};

export default DocumentUploader;
