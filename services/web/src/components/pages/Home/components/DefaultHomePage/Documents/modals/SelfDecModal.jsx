import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';

import { fetchDocuments } from '../../../../../../../redux/requests/requestActions';

import { Modal, Typography, Button, Checkbox, Form, Input } from 'antd';
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

  const [checked, setChecked] = useState(false);
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
      `${selectedCategory} self declaration explanation: ${value.text}`
    );
  };

  return (
    <>
      <Modal
        title={<Title level={5}>Self-Declaration</Title>}
        visible={selfDecModalVisibility}
        bodyStyle={{ height: '20vh' }}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <>
            <Button
              onClick={() => {
                handleCancel();
                setChecked(false);
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={!checked}
              type="primary"
              danger
              onClick={() => {
                postSelfDecPlaceholder();
                handleSelfDecAccept();
                setChecked(false);
              }}
            >
              Submit
            </Button>
          </>,
        ]}
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
        {/* <Paragraph>
          By clicking below I am stating that I am unable to provide
          documentation for category: {selectedCategory}. And that I am prepared
          to provide a detailed explanation of my current status in lieu of
          providing documentation.
        </Paragraph>
        <Checkbox checked={checked} onChange={() => setChecked(!checked)}>
          I have read and understand the statement above
        </Checkbox> */}
      </Modal>
    </>
  );
};

export default SelfDecModal;
