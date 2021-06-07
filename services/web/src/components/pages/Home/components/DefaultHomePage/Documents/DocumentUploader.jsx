import { useEffect } from 'react';

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

  const updateDoc = async name => {
    //Persist Changes on BE
    try {
      //Find document
      let docs = await axiosWithAuth()
        .get(`/requests/${request.id}/documents`)
        .then(res => res.data.documents);

      let newDoc = docs.filter(doc => {
        if (doc.name === name) return doc;
      });

      // Update document category and status
      newDoc[0].category = category;
      newDoc[0].status = 'received';

      //PUT Changes

      await axiosWithAuth()
        .put(`/documents/${newDoc[0].id}`, newDoc[0])
        .then(res => res.data);

      //Update local state to reflect new category status
      updateLocalStatuses(tableData, category, 'received');

      // ********************************************

      // let updatedDocs = await axiosWithAuth()
      //   .get(`/requests/${request.id}/documents`)
      //   .then(res => res.data.documents);

      //   dispatch(setDocuments(updatedDocs));

      // ********************************************

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

        //persist changes on data base
        updateDoc(info.file.name);

        //persist changes on local state
        //persist changes in store
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
