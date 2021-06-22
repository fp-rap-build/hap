import { useState } from 'react';

import { Input, Form, Button } from 'antd';
import { ConsoleSqlOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const RenderSelfDecDocument = ({
  sessionId,
  userText,
  setUserText,
  handleDocCreation,
}) => {
  const docUrl = `https://app.pandadoc.com/s/${sessionId}`;

  const handleTextChange = values => {
    console.log(values);
    setUserText(values.text);
  };

  const onFinish = values => {
    //Set text to be used in doc
    setUserText(values);
    //Create doc - this will also toggle the create doc modal
    handleDocCreation();
  };

  const UserTextInput = () => {
    return (
      <div>
        <Form layout="vertical" name="selfDecUserInput" onFinish={onFinish}>
          <Form.Item
            name="text"
            label="Briefly explain why you cannot provide a document:"
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
              Create Document
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };

  return (
    <div>
      {/* Toggle components with sessionID - which is set from clicking generate form in the footer */}
      {sessionId ? (
        <div className="documentContainer">
          <iframe
            title="Self Dec Embed"
            src={docUrl}
            style={{ height: '70vh', width: '75vw' }}
          ></iframe>
        </div>
      ) : (
        <UserTextInput />
      )}
    </div>
  );
};

export default RenderSelfDecDocument;
