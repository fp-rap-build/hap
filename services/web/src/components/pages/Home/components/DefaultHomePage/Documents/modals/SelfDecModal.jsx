import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { processDocument } from '../utils/pandaDocUtils';

import SELF_DEC_SCHEMA from '../utils/selfDecSchema';

import RenderSelfDecDocument from './RenderSelfDecDocument';

import { fetchDocuments } from '../../../../../../../redux/requests/requestActions';

import { Modal, Typography, Button, Input, Spin } from 'antd';

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

  const dispatch = useDispatch();

  const fetchUserDocuments = () => dispatch(fetchDocuments(request.id));

  const [documentView, setDocumentView] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [userText, setUserText] = useState('');

  const handleDocCreation = async () => {
    setLoading(true);
    try {
      const sessionIdfromAPI = await processDocument(
        currentUser,
        userText,
        selectedCategory,
        SELF_DEC_SCHEMA
      );
      console.log('From The Other Side', sessionIdfromAPI);
      setSessionId(sessionIdfromAPI);
      // console.log(sessionId);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      // console.log(sessionId);
    }
  };

  return (
    <>
      <Modal
        title={<Title level={5}>Self-Declaration</Title>}
        visible={selfDecModalVisibility}
        width={sessionId ? '80vw' : 520}
        maskClosable={false}
        onCancel={() => {
          handleCancel();
          setDocumentView(false);
        }}
        footer={
          [
            // <>
            //   <Button
            //     onClick={() => {
            //       handleCancel();
            //     }}
            //   >
            //     Cancel
            //   </Button>
            //   <Button
            //     type="primary"
            //     danger
            //     onClick={() => {
            //       // postSelfDecPlaceholder();
            //       // handleSelfDecAccept();
            //       handleDocCreation();
            //     }}
            //   >
            //     Create Document
            //   </Button>
            // </>,
          ]
        }
      >
        <div className="modalTextInput">
          {loading ? (
            <Spin tip="Creating Your Document!" />
          ) : (
            <RenderSelfDecDocument
              sessionId={sessionId}
              userText={userText}
              setUserText={setUserText}
              handleDocCreation={handleDocCreation}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default SelfDecModal;
//Adding place holder doc now as confirmation the user completed this process.
//Will be replaced with PDF via panda Doc
// const placeHolderDoc = {
//   requestId: request.id,
//   name: 'self_declaration.pdf',
//   type: 'application/pdf',
//   location: process.env.REACT_APP_PLACEHOLDER_LOCATION,
//   key: process.env.REACT_APP_PLACEHOLDER_KEY,
//   category: selectedCategory,
//   status: 'optOut',
// };

// const postSelfDecPlaceholder = async () => {
//   try {
//     await axiosWithAuth()
//       .post('/documents', placeHolderDoc)
//       .then(res => res.data);

//     fetchUserDocuments();
//     updateLocalStatuses(tableData, selectedCategory, 'optOut');
//   } catch (error) {
//     alert('Error saving self declaration');
//   }
// };
