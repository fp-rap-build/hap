import { useState } from 'react';

import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

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
