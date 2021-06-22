import { useState } from 'react';

import { Input, Form, Button } from 'antd';
import { ConsoleSqlOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const RenderSelfDecDocument = ({ sessionId, userText, setUserText }) => {
  const docUrl = `https://app.pandadoc.com/s/${sessionId}`;

  const handleTextChange = values => {
    console.log(values);
    setUserText(values.text);
  };

  const UserTextInput = () => {
    return (
      <div>
        <Form
          layout="vertical"
          name="selfDecUserInput"
          onFinish={handleTextChange}
        >
          <Form.Item
            name="text"
            label="Please tell us why you can not provide this form"
            required
            initialValue={userText}
          >
            <TextArea key="fix" rows={5} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
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
