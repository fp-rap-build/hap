import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';

import pandaDocUtils from '../utils/pandaDocUtils';

import { fetchDocuments } from '../../../../../../../redux/requests/requestActions';

import { Modal, Typography, Button, Input } from 'antd';
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
  const [documentView, setDocumentView] = useState(false);

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

  const ModalTextInput = () => {
    return (
      <div className="modalTextInput">
        <TextArea allowClear={true}></TextArea>
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
      </div>
    );
  };

  const PandaDocView = () => {
    return (
      <div className="documentContainer">
        <iframe
          title="Self Dec Embed"
          src="https://app.pandadoc.com/s/t8K3iwT4ar7CMes4Sn9eFn"
          style={{ height: '70vh', width: '60vw' }}
        ></iframe>
      </div>
    );
  };

  const RenderContent = () => {
    if (documentView) {
      return <PandaDocView />;
    }
    return <ModalTextInput />;
  };

  return (
    <>
      <Modal
        title={<Title level={5}>Self-Declaration</Title>}
        visible={selfDecModalVisibility}
        bodyStyle={documentView ? { width: '80vh' } : null}
        onCancel={() => {
          handleCancel();
          setDocumentView(false);
        }}
        footer={[
          <>
            <Button
              onClick={() => {
                handleCancel();
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                // postSelfDecPlaceholder();
                // handleSelfDecAccept();
                setDocumentView(true);
              }}
            >
              Create Document
            </Button>
          </>,
        ]}
      >
        <RenderContent />
      </Modal>
    </>
  );
};

export default SelfDecModal;
