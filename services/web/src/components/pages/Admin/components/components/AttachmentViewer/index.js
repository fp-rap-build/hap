import { useState, useEffect } from 'react';
import { Modal, Pagination } from 'antd';
import PdfViewer from './components/PdfViewer';
import ImageViewer from './components/ImageViewer';
import Status from './components/Status';

export default function Index({ visible, setVisible, documents, setRequests }) {
  const closeDocument = () => setVisible(false);

  const [currentDocument, setCurrentDocument] = useState(null);

  useEffect(() => {
    setCurrentDocument(documents[0]);
  }, [documents]);

  if (!visible) return <></>;

  if (!currentDocument) return <></>;

  const changeDocument = page => {
    setCurrentDocument(documents[page - 1]);
  };

  return (
    <Modal
      title={'Review Document'}
      width={640}
      style={{ minHeight: 900 }}
      visible={visible}
      onCancel={closeDocument}
      footer={[
        <Pagination
          onChange={changeDocument}
          defaultCurrent={1}
          total={documents.length * 10}
        />,
      ]}
    >
      <Status document={currentDocument} setRequests={setRequests} />

      {currentDocument?.type === 'application/pdf' ? (
        <PdfViewer pdfLocation={currentDocument?.location} />
      ) : (
        <ImageViewer imgLocation={currentDocument?.location} />
      )}
    </Modal>
  );
}
