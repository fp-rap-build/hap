const RenderSelfDecDocument = ({ sessionId }) => {
  const docUrl = `https://app.pandadoc.com/s/${sessionId}`;

  return (
    <div>
      {sessionId ? (
        <div className="documentContainer">
          <iframe
            title="Self Dec Embed"
            src={docUrl}
            style={{ height: '70vh', width: '75vw' }}
          ></iframe>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RenderSelfDecDocument;
