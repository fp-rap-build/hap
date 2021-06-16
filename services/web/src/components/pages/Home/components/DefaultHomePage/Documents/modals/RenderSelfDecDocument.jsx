import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import pandaUtils from '../utils/pandaDocUtils';

import LoadingComponent from '../../../../../../common/LoadingComponent';

const templateId = process.env.REACT_APP_SELF_DEC_TEMPLATE_ID;

const RenderSelfDecDocument = ({ sessionId }) => {
  const docUrl = sessionId => {
    return `https://app.pandadoc.com/s/${sessionId}`;
  };

  return (
    <div>
      {sessionId ? (
        <div className="documentContainer">
          <iframe
            title="Self Dec Embed"
            src={docUrl(sessionId)}
            style={{ height: '70vh', width: '50vw' }}
          ></iframe>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default RenderSelfDecDocument;
