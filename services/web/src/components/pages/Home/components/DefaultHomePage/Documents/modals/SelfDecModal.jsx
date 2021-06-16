import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';

import RenderSelfDecDocument from './RenderSelfDecDocument';

import pandaDocUtils from '../utils/pandaDocUtils';

import { fetchDocuments } from '../../../../../../../redux/requests/requestActions';

import { Modal, Typography, Button, Input, Form } from 'antd';
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
  //DEV DELETE AT PUSH
  console.log(request);
  console.log(currentUser);
  //--------------------------
  const dispatch = useDispatch();
  const fetchUserDocuments = () => dispatch(fetchDocuments(request.id));

  const [documentView, setDocumentView] = useState(false);
  const [userText, setUserText] = useState({ text: '' });

  const handleTextChange = e => {
    e.stopPropagation();
    setUserText({ ...userText, text: e.target.value });
  };
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
        <Form>
          <Form.Item>
            <Input rows={5} onChange={handleTextChange} value={userText.text} />
          </Form.Item>
        </Form>
      </div>
    );
  };

  const RenderContent = () => {
    return documentView ? (
      <RenderSelfDecDocument
        selectedCategory={selectedCategory}
        userText={userText}
      />
    ) : (
      <ModalTextInput />
    );
  };

  return (
    <>
      <Modal
        title={<Title level={5}>Self-Declaration</Title>}
        visible={selfDecModalVisibility}
        width={documentView ? '60vw' : 520}
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
        <div className="modalTextInput">
          <RenderContent />
        </div>
      </Modal>
    </>
  );
};

export default SelfDecModal;
