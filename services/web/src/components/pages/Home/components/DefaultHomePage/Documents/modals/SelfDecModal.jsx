import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';

import { processDocument } from '../utils/pandaDocUtils';

import SELF_DEC_SCHEMA from '../utils/selfDecSchema';

import RenderSelfDecDocument from './RenderSelfDecDocument';

import { fetchDocuments } from '../../../../../../../redux/requests/requestActions';

import { Modal, Typography, Button, Input, Spin } from 'antd';

const { Paragraph, Title } = Typography;
const { TextArea } = Input;

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
  const [userText, setUserText] = useState('');

  const handleDocCreation = async text => {
    setLoading(true);
    try {
      console.log(userText);
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

  const handleFinalClose = () => {
    postSelfDecPlaceholder();
    handleSelfDecAccept();
    setUserText('');
    setSessionId('');
  };

  return (
    <>
      <Modal
        title={<Title level={5}>Self-Declaration</Title>}
        visible={selfDecModalVisibility}
        width={sessionId ? '80vw' : 520}
        maskClosable={false}
        onCancel={() => {
          setSessionId('');
          setUserText('');
          handleCancel();
        }}
        footer={
          [
            // <>
            //   <Button
            //     onClick={() => {
            //       handleCancel();
            //     }}
            //   >
            //     Cancel
            //   </Button>
            //   <Button
            //     type="primary"
            //     danger
            //     onClick={() => {
            //       // postSelfDecPlaceholder();
            //       // handleSelfDecAccept();
            //       handleDocCreation();
            //     }}
            //   >
            //     Create Document
            //   </Button>
            // </>,
          ]
        }
      >
        <div className="modalTextInput">
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Spin tip="Creating Your Document!" />
            </div>
          ) : (
            <RenderSelfDecDocument
              sessionId={sessionId}
              userText={userText}
              setUserText={setUserText}
              handleDocCreation={handleDocCreation}
              handleFinalClose={handleFinalClose}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default SelfDecModal;
