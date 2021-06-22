import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import pandaUtils from '../utils/pandaDocUtils';

import LoadingComponent from '../../../../../../common/LoadingComponent';

const templateId = process.env.REACT_APP_SELF_DEC_TEMPLATE_ID;

const RenderSelfDecDocument = ({ sessionId }) => {
  const docUrl = `https://app.pandadoc.com/s/${sessionId}`;

  return (
    <div>
      {sessionId ? (
        <div className="documentContainer">
          <iframe
            title="Self Dec Embed"
            src={docUrl}
            style={{ height: '70vh', width: '50vw' }}
          ></iframe>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RenderSelfDecDocument;
