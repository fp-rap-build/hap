import React from 'react';

import { Button } from 'antd';

import { processLLDoc } from '../../../../../../../utils/pandaDocUtils';

export default function UpafUpload() {
  const createPandaDoc = async docPayload => {
    setLoadingDoc(true);
    try {
      const res = await processLLDoc(docPayload);
      setDocumentInfo(res);
    } catch (error) {
      console.log(error);
      alert('Error creating document');
    } finally {
      setLoadingDoc(false);
    }
  };

  const handleClick = () => {
    createPandaDoc(w9DocumentPayload);
    setSelectedCategory('landlordW9');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <p>Create</p>
      <Button>Create document</Button>
    </div>
  );
}
