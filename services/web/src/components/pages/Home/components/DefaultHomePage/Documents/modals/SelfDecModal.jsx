import { useState } from 'react';

import { Modal, Typography, Button, Checkbox } from 'antd';
const { Paragraph, Title } = Typography;

const SelfDecModal = ({
  selfDecModalVisibility,
  handleCancel,
  handleSelfDecAccept,
  selectedCategory,
  request,
}) => {
  const [checked, setChecked] = useState(false);

  //Adding place holder doc now as confirmation the user completed this process.
  //Will be replaced with PDF via pand Doc
  const placeHolderDoc = {
    requestId: request.id,
    name: 'self_declaration.pdf',
    type: 'application/pdf',
    location:
      'https://fpspokane.s3.us-east-2.amazonaws.com/1622510223510-self_declaration.pdf',
    key: '1622510223510-self_declaration.pdf',
  };

  return (
    <>
      <Modal
        title={<Title level={5}>Self-Declaration</Title>}
        visible={selfDecModalVisibility}
        bodyStyle={{ height: '20vh' }}
        onCancel={handleCancel}
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
                handleSelfDecAccept();
                setChecked(false);
              }}
            >
              Submit
            </Button>
          </>,
        ]}
      >
        <Paragraph>
          By clicking below I am stating that I am unable to provide
          documentation for category: {selectedCategory}. And that I am prepared
          to provide a detailed explanation of my current status in lieu of
          providing documentation.
        </Paragraph>
        <Checkbox checked={checked} onChange={() => setChecked(!checked)}>
          I have read and understand the statement above
        </Checkbox>
      </Modal>
    </>
  );
};

export default SelfDecModal;
