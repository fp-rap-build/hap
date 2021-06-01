import { useState } from 'react';

import { Modal, Typography, Button, Checkbox } from 'antd';
const { Paragraph, Title } = Typography;

const SelfDecModal = ({
  selfDecModalVisibility,
  handleCancel,
  handleSelfDecAccept,
  selectedCategory,
}) => {
  const [checked, setChecked] = useState(false);

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
