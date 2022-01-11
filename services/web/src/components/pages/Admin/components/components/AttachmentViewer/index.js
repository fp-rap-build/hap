import { useState, useEffect } from 'react';
import { Modal, Pagination } from 'antd';
import PdfViewer from './components/PdfViewer';
import ImageViewer from './components/ImageViewer';
import Status from './components/Status';
import SubmitDocument from './components/SubmitDocument';
import Category from './components/Category';
import DeleteDocument from './components/DeleteDocument';
import UpafUpload from './components/UpafUpload';

export default function Index({
  visible,
  setVisible,
  documents,
  setDocuments,
  setRequests,
  category,
  request,
}) {
  const [currentDocument, setCurrentDocument] = useState(null);

  const closeDocument = () => {
    setCurrentDocument(null);

    setDocuments([]);

    setVisible(false);
  };

  const changeDocument = page => {
    setCurrentDocument(documents[page - 1]);
  };

  useEffect(() => {
    console.log(documents);
    setCurrentDocument(documents[0]);
  }, [documents]);

  if (!visible) return <div />;

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
      <div style={{ display: 'flex', gap: '1rem' }}>
        {currentDocument && (
          <>
            <Status document={currentDocument} setRequests={setRequests} />
            <Category
              document={currentDocument}
              setRequests={setRequests}
              setDocuments={setDocuments}
            />
          </>
        )}

        <SubmitDocument
          request={request}
          setRequests={setRequests}
          category={category}
          setDocuments={setDocuments}
        />

        {currentDocument && (
          <DeleteDocument
            document={currentDocument}
            setDocuments={setDocuments}
            setRequests={setRequests}
            request={request}
            category={category}
          />
        )}

        {category === 'upaf' && (
          <UpafUpload request={request} setDocuments={setDocuments} />
        )}
      </div>

      {currentDocument?.type === 'application/pdf' ? (
        <PdfViewer
          setCurrentDocument={setCurrentDocument}
          currentDocument={currentDocument}
        />
      ) : (
        <ImageViewer imgLocation={currentDocument?.location} />
      )}
    </Modal>
  );
}
