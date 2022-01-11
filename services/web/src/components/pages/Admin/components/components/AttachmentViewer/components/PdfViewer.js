import { useState, useEffect } from 'react';

import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';

import { Button } from 'antd';
import { axiosForPanda } from '../../../../../../../api/axiosForPanda';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PdfViewer({ currentDocument, setCurrentDocument }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pandaDocUrl, setPandaDocUrl] = useState(null);

  useEffect(() => {
    if (currentDocument.pandaId) {
      pandaDocDownload();
    }
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const nextPage = () => {
    if (pageNumber === numPages || !numPages) return;

    setPageNumber(pageNumber + 1);
  };

  const previousPage = () => {
    if (pageNumber === 1) return;

    setPageNumber(pageNumber - 1);
  };

  const pandaDocDownload = async () => {
    setLoading(true);
    try {
      const dlDoc = await axiosForPanda().get(
        `/documents/${currentDocument.pandaId}/download`,
        { responseType: 'blob' }
      );

      //Create a blob from the PDF Stream
      const file = new Blob([dlDoc.data], { type: 'application/pdf' });

      //Build a URL from the file
      const fileURL = URL.createObjectURL(file);

      setCurrentDocument({ ...currentDocument, location: fileURL });
    } catch (error) {
      alert('Unable to download document from PandaDocs.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Downloading Self Declaration..</div>;
  }

  return (
    <div>
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => window.open(currentDocument.location, '_blank')}
      >
        <Document
          file={currentDocument.location}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page width={616} pageNumber={pageNumber} />
        </Document>
      </div>
      <p>
        Page {pageNumber} of {numPages}
      </p>

      <Button onClick={previousPage}>Previous</Button>
      <Button onClick={nextPage}>Next</Button>
    </div>
  );
}
