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

  if (!visible) return <></>;

  return (
    <Modal
      title={'Review Document'}
      width={640}
      visible={visible}
      onCancel={closeDocument}
    >
      <div>
        <Status document={currentDocument} setRequests={setRequests} />
        <PdfViewer pdfLocation={currentDocument.location} />
      </div>
    </Modal>
  );
}
