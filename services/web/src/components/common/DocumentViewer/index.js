import PdfViewer from './components/PdfViewer';
import ImageViewer from './components/ImageViewer';

export default function Index({ document }) {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {document?.type === 'application/pdf' ? (
        <PdfViewer pdfLocation={document?.location} />
      ) : (
        <ImageViewer imgLocation={document?.location} />
      )}
    </div>
  );
}
