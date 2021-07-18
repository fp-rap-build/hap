import { Modal } from 'antd';
import PdfViewer from './components/PdfViewer';
import ImageViewer from './components/ImageViewer';
import Status from './components/Status';

export default function Index({
  visible,
  setVisible,
  currentDocument,
  setRequests,
}) {
  const closeDocument = () => setVisible(false);

  if (!visible) return <></>;

  return (
    <Modal
      title={'Review Document'}
      width={640}
      visible={visible}
      onCancel={closeDocument}
    >
      <Status document={currentDocument} setRequests={setRequests} />

      {currentDocument.type === 'application/pdf' ? (
        <PdfViewer pdfLocation={currentDocument.location} />
      ) : (
        <ImageViewer imgLocation={currentDocument.location} />
      )}
    </Modal>
  );
}
