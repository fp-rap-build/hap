import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { axiosForPanda } from '../../../../api/axiosForPanda';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';

import { Button, Input } from 'antd';

const DevTest = () => {
  const request = useSelector(state => state.requests.request);
  console.log(request);

  const [document, setDocument] = useState(null);

  const downloadDoc = async () => {
    try {
      const dl = await axiosForPanda().get(
        'https://api.pandadoc.com/public/v1/documents/Yy8MWS3nVppyWosXDvKxC3/download'
      );

      // const doc = await axiosWithAuth().post(
      //   `/requests/${request.id}/documents`,
      //   dl
      // );
      setDocument(dl.data);
      console.log(dl);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div>
      <h2> Dev Test</h2>
      <Button onClick={downloadDoc}>DL Doc</Button>
      {document ? (
        <object
          data={document}
          type="application/pdf"
          width="100%"
          height="100%"
        >
          <p>Alternative Text</p>
        </object>
      ) : null}
    </div>
  );
};

export default DevTest;
