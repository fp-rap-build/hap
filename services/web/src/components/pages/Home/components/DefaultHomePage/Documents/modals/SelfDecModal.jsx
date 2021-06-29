import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';

import { processDocument } from '../utils/pandaDocUtils';

import SELF_DEC_SCHEMA from '../utils/selfDecSchema';

import RenderSelfDecDocument from './RenderSelfDecDocument';

import { fetchDocuments } from '../../../../../../../redux/requests/requestActions';

import { Modal, Typography, Button, Form, Input, Spin } from 'antd';
const { Title } = Typography;

const SelfDecModal = ({
  selfDecModalVisibility,
  handleCancel,
  handleSelfDecAccept,
  selectedCategory,
  request,
  updateLocalStatuses,
  tableData,
}) => {
  const currentUser = useSelector(state => state.user.currentUser);

  const dispatch = useDispatch();
  const fetchUserDocuments = () => dispatch(fetchDocuments(request.id));

  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDocCreation = async text => {
    setLoading(true);
    try {
      const sessionIdfromAPI = await processDocument(
        currentUser,
        text,
        selectedCategory,
        SELF_DEC_SCHEMA
      );
      setSessionId(sessionIdfromAPI);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //Adding place holder doc now as confirmation the user completed this process.
  const placeHolderDoc = {
    requestId: request.id,
    name: 'self_declaration.pdf',
    type: 'application/pdf',
    location: process.env.REACT_APP_PLACEHOLDER_LOCATION,
    key: process.env.REACT_APP_PLACEHOLDER_KEY,
    category: selectedCategory,
    status: 'optOut',
  };

  const postSelfDecPlaceholder = async () => {
    try {
      await axiosWithAuth()
        .post('/documents', placeHolderDoc)
        .then(res => res.data);

      fetchUserDocuments();
      updateLocalStatuses(tableData, selectedCategory, 'optOut');
    } catch (error) {
      alert('Error saving self declaration');
    }
  };

  //Post explanation to comments
  const postToComments = async userText => {
    const reqBody = {
      requestId: request.id,
      authorId: currentUser.id,
      comment: userText,
      category: 'external',
      createdAt: new Date().toISOString(),
    };

    try {
      await axiosWithAuth().post(`comments/`, reqBody);
    } catch (error) {
      alert('ERROR POSTING COMMENT');
      console.log(error);
    }
  };

  const handleTextSubmit = text => {
    postToComments(
      `${selectedCategory.toUpperCase()} Self Declaration explanation: ${text}`
    );
    //If the category is children/pregnancy do not continue to panda doc signature
    if (selectedCategory === 'childrenOrPregnancy') {
      handleSelfDecAccept();
      postSelfDecPlaceholder();
    } else {
      //builds doc and populates sessionID which opens embeded document view
      handleDocCreation(text);
    }
  };

  const handleModalCloseButton = () => {
    //If selectedCategory is childrenOrPregnancy or sessionId is falsy  - just close the modal
    if (selectedCategory === 'childrenOrPregnancy' || !sessionId) {
      handleCancel();
    } else {
      //Else the doc has been started/ completed so we need to post teh self dec placeholder, handel the accept and wipe session ID
      postSelfDecPlaceholder();
      handleSelfDecAccept();
      setSessionId('');
    }
  };

  return (
    <>
      <Modal
        title={<Title level={5}>Self-Declaration</Title>}
        visible={selfDecModalVisibility}
        bodyStyle={sessionId ? { height: '80vh' } : { height: '16rem' }}
        width={sessionId ? '80vw' : 520}
        onCancel={handleModalCloseButton}
        maskClosable={false}
        footer={null}
      >
        <div className="selfDecContent">
          {loading ? (
            <div
              className="loadingSpinner"
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Spin tip="Creating your document..." />
            </div>
          ) : (
            <RenderSelfDecDocument
              sessionId={sessionId}
              handleTextSubmit={handleTextSubmit}
              handleModalCloseButton={handleModalCloseButton}
              selectedCategory={selectedCategory}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default SelfDecModal;
