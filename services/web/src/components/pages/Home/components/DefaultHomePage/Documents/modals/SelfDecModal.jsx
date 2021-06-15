import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';

import pandaDocUtils from '../utils/pandaDocUtils';

import { Modal, Typography, Button, Checkbox } from 'antd';
import { fetchDocuments } from '../../../../../../../redux/requests/requestActions';
const { Paragraph, Title } = Typography;

const SelfDecModal = ({
  selfDecModalVisibility,
  handleCancel,
  handleSelfDecAccept,
  selectedCategory,
  request,
  updateLocalStatuses,
  tableData,
}) => {
  const [checked, setChecked] = useState(false);

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
                // postSelfDecPlaceholder();
                handleSelfDecAccept();
                setChecked(false);
              }}
            >
              Submit
            </Button>
          </>,
        ]}
      >
        {/* <Paragraph>
          By clicking below I am stating that I am unable to provide
          documentation for category: {selectedCategory}. And that I am prepared
          to provide a detailed explanation of my current status in lieu of
          providing documentation.
        </Paragraph>
        <Checkbox checked={checked} onChange={() => setChecked(!checked)}>
          I have read and understand the statement above
        </Checkbox> */}
        <Button
          onClick={async () => {
            const templateId = await pandaDocUtils.fetchTemplateId(
              'self_declaration'
            );
            console.log(templateId.results[0].id);
          }}
        >
          DEV fetchTemplateId
        </Button>
      </Modal>
      {/* <iframe
            title="Self Dec Embed"
            src="https://app.pandadoc.com/s/t8K3iwT4ar7CMes4Sn9eFn"
            style={{ height: '70vh', width: '60vw' }}
          ></iframe> */}
    </>
  );
};

export default SelfDecModal;
