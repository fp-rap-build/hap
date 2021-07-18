import { Modal } from 'antd';
import PdfViewer from './components/PdfViewer';
import Status from './components/Status';

export default function Index({
  visible,
  setVisible,
  currentDocument,
  setRequests,
}) {
  const closeDocument = () => setVisible(false);

  return (
    <Modal
      title={'Review Document'}
      width={640}
      visible={visible}
      onCancel={closeDocument}
    >
      <Status
        docStatus={currentDocument.status}
        category={currentDocument.category}
        requestId={currentDocument.requestId}
        docId={currentDocument.docId}
        setRequests={setRequests}
      />
      <PdfViewer pdfLocation={currentDocument.location} />
    </Modal>
  );
}
