import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';

import { processDocument } from '../../../../../../../utils/pandaDocUtils';

import SELF_DEC_SCHEMA from '../utils/selfDecSchema';

import RenderSelfDecDocument from './RenderSelfDecDocument';

import { fetchDocuments } from '../../../../../../../redux/requests/requestActions';

import { Modal, Typography, Spin } from 'antd';
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

  //sessionId is only truthy once Document has been creaated
  //sessionId is used to access the embed document as well as toggle necessary UI
  const [sessionId, setSessionId] = useState('');
  const [pandaInfo, setPandaInfo] = useState({ docId: '', docName: '' });
  const [loading, setLoading] = useState(false);

  //----- HELPERS -----//
  const handleDocCreation = async text => {
    setLoading(true);
    try {
      const pandaDocRes = await processDocument(
        currentUser,
        text,
        selectedCategory,
        SELF_DEC_SCHEMA
      );
      setSessionId(pandaDocRes.sessionId);
      setPandaInfo({
        docId: pandaDocRes.docId,
        docName: pandaDocRes.docName,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //Create placeholder Doc and POST when necessary to update UI and track self dec on BE
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

  const postPandaInfo = async () => {
    const uploadObj = {
      requestId: request.id,
      name: pandaInfo.docName,
      type: 'application/pdf',
      location: process.env.REACT_APP_PLACEHOLDER_LOCATION,
      key: process.env.REACT_APP_PLACEHOLDER_KEY,
      category: selectedCategory,
      status: 'optOut',
      pandaId: pandaInfo.docId,
    };

    try {
      await axiosWithAuth()
        .post('/documents', uploadObj)
        .then(res => res.data);

      fetchUserDocuments();
      updateLocalStatuses(tableData, selectedCategory, 'optOut');
    } catch (error) {
      alert('Error saving self declaration');
    }
  };

  //Post self dec input to comments for staff ease of use
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

  //----- EVENT HANDLERS -----//

  const handleTextSubmit = text => {
    postToComments(
      `${selectedCategory.toUpperCase()} Self Declaration explanation: ${text}`
    );
    //If the category is children/pregnancy do not continue to panda doc signature
    if (selectedCategory === 'childrenOrPregnancy') {
      console.log(
        'Sorry, we cannot accept a self declaration for this cateogry.'
      );

      if (selectedCategory === 'identity') {
        console.log(
          'Sorry, we cannot accept a self declaration for this cateogry.'
        );
      }
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
      postPandaInfo();
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
              style={{
                display: 'flex',
                justifyContent: 'center',
                height: '10rem',
                alignItems: 'center',
              }}
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
