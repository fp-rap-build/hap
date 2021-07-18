import { Modal } from 'antd';
import PdfViewer from './components/PdfViewer';

export default function Index({ visible, setVisible, currentDocument }) {
  const closeDocument = () => setVisible(false);

  return (
    <Modal title={'Review Document'} visible={visible} onCancel={closeDocument}>
      <PdfViewer pdfLocation={currentDocument.location} />
    </Modal>
  );
}
