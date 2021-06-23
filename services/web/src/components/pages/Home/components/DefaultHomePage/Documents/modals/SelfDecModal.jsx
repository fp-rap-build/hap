import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';

import { fetchDocuments } from '../../../../../../../redux/requests/requestActions';

import { Modal, Typography, Button, Form, Input } from 'antd';
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

  const [userText, setUserText] = useState('');

  const dispatch = useDispatch();
  const fetchUserDocuments = () => dispatch(fetchDocuments(request.id));

  //Adding place holder doc now as confirmation the user completed this process.
  //Will be replaced with PDF via panda Doc
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

  const onFinish = value => {
    setUserText(value.text);
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
        bodyStyle={{ height: '16rem' }}
        onCancel={handleCancel}
        maskClosable={false}
        footer={null}
      >
        <div className="selfDecContent">
          <Form layout="vertical" name="selfDecUserInput" onFinish={onFinish}>
            <Form.Item
              name="text"
              label="Briefly explain why you cannot provide the requested document:"
              initialValue={userText}
              rules={[
                {
                  required: true,
                  message: 'Please explain why you cannot provide a document!',
                },
                {
                  min: 20,
                  message: 'Explanation must be at least 20 characters!',
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
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default SelfDecModal;
