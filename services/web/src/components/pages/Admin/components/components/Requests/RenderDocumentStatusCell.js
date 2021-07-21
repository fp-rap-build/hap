import StatusCircle from './StatusCircle';

const RenderDocumentStatusCell = ({ docs, openDocument }) => {
  let colors = {
    grey: '#AAAAAA',
    green: '#B1EEC6',
    lightgreen: '#f0fff5',
    red: '#F0B0AE',
    yellow: '#EDE988',
    orange: '#f6c28e',
  };

  let noDocsSubmitted = docs.length === 0;

  let allVerified = true;

  let allDenied = true;

  let unReviewedDocuments = false;

  let unFinishedDocuments = false;

  docs.forEach(doc => {
    if (doc.status !== 'denied') allDenied = false;

    if (doc.status !== 'verified') allVerified = false;

    if (doc.status === 'received') unReviewedDocuments = true;

    if (doc.status === 'actionsRequired') unFinishedDocuments = true;
  });

  if (noDocsSubmitted)
    return (
      <StatusCircle
        onClick={openDocument}
        tooltip={'No documents submitted'}
        color={colors.grey}
        clickable
      />
    );

  if (unReviewedDocuments)
    return (
      <StatusCircle
        onClick={openDocument}
        tooltip={'Documents pending for review'}
        color={colors.orange}
        clickable
      />
    );

  if (unFinishedDocuments)
    return (
      <StatusCircle
        onClick={openDocument}
        tooltip={'Additional actions required'}
        color={colors.yellow}
        clickable
      />
    );

  if (allVerified)
    return (
      <StatusCircle
        onClick={openDocument}
        tooltip={'All documents received and verified'}
        color={colors.green}
        clickable
      />
    );

  if (allDenied)
    return (
      <StatusCircle
        onClick={openDocument}
        tooltip={'All documents denied'}
        color={colors.red}
        clickable
      />
    );

  if (!allVerified && !allDenied)
    return (
      <StatusCircle
        onClick={openDocument}
        tooltip={'Some documents verified'}
        color={colors.lightgreen}
        clickable
      />
    );

  return <StatusCircle onClick={openDocument} color={'white'} />;
};

export default RenderDocumentStatusCell;
