import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';

import { processDocument } from '../utils/pandaDocUtils';

import SELF_DEC_SCHEMA from '../utils/selfDecSchema';

import RenderSelfDecDocument from './RenderSelfDecDocument';

import { fetchDocuments } from '../../../../../../../redux/requests/requestActions';

import { Modal, Typography, Button, Form, Input, Spin } from 'antd';
const { Title } = Typography;
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

  const onFinish = value => {
    postToComments(
      `${selectedCategory.toUpperCase()} Self Declaration explanation: ${
        value.text
      }`
    );
    postSelfDecPlaceholder();
    handleSelfDecAccept();
  };

  return (
    <>
      <Modal
        title={<Title level={5}>Self-Declaration</Title>}
        visible={selfDecModalVisibility}
        bodyStyle={sessionId ? { height: '80vh' } : { height: '16rem' }}
        width={sessionId ? '80vw' : 520}
        onCancel={handleCancel}
        maskClosable={false}
        footer={null}
      >
        <div className="selfDecContent">
          {/* <Form layout="vertical" name="selfDecUserInput" onFinish={onFinish}>
            <Form.Item
              name="text"
              label="Briefly explain why you cannot provide the requested document:"
              rules={[
                {
                  required: true,
                  message: 'Please explain why you cannot provide a document.',
                },
                {
                  min: 20,
                  message: 'Explanation must be at least 20 characters.',
                },
              ]}
            >
              <TextArea key="fix" rows={5} allowClear />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form> */}
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
