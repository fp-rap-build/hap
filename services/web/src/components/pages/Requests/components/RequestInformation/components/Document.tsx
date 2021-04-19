import { useState } from 'react';

import { Typography, Button } from 'antd';

import { DownloadOutlined } from '@ant-design/icons';

import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

import styles from '../../../../../../styles/pages/request.module.css';

const { Paragraph } = Typography;

const Document = ({ document, setDocuments }) => {
  const [docState, setDocState] = useState(document);

  const handleChange = value => {
    if (docState.name === value) {
      return;
    }
    const updateDocument = { ...document, name: value };
    setDocState(updateDocument);
    postNameChange(updateDocument);
  };

  const postNameChange = async newDocument => {
    try {
      const res = await axiosWithAuth().put(
        `documents/${newDocument.id}`,
        newDocument
      );

      setDocuments(prevState =>
        prevState.map(doc => {
          if (doc.id == newDocument.id) {
            return newDocument;
          }
          return doc;
        })
      );
    } catch (error) {
      alert('Un-able to update document name');
      console.error(error);
    }
  };

  return (
    <div className={styles.document}>
      <Paragraph
        editable={{ onChange: handleChange, tooltip: 'click to edit name' }}
        style={{ paddingTop: '1%' }}
      >
        {docState.name}
      </Paragraph>
      <a
        href={document.location}
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginLeft: '2%' }}
      >
        <Button>
          <DownloadOutlined /> Download
        </Button>
      </a>
    </div>
  );
};

export default Document;
