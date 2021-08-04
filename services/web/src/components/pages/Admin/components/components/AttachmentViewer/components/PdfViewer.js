import { useState } from 'react';

import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';

import { Button } from 'antd';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PdfViewer({ pdfLocation }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

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

      <Button onClick={previousPage}>Previous</Button>
      <Button onClick={nextPage}>Next</Button>
    </div>
  );
}
