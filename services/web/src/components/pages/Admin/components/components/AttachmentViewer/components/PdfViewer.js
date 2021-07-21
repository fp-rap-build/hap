import { useState } from 'react';

import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PdfViewer({ pdfLocation }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => window.open(pdfLocation, '_blank')}
      >
        <Document file={pdfLocation} onLoadSuccess={onDocumentLoadSuccess}>
          <Page width={616} pageNumber={pageNumber} />
        </Document>
      </div>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}
