import { useState } from 'react';

import { Typography, Button, Card, Modal, message } from 'antd';

import { DownloadOutlined, DeleteOutlined } from '@ant-design/icons';

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

  const handleDownload = () => window.open(docState.location, '_blank');

  const handleDelete = () => {
    const deleteDocument = async () => {
      try {
        await axiosWithAuth().delete(`/documents/${docState.id}`);

        setDocuments(prevState =>
          prevState.filter(doc => doc.id !== docState.id)
        );
      } catch (error) {
        message.error('Unable to delete documents');
      }
    };

    confirmDelete(deleteDocument);
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
      alert('Unable to update document name');
      console.error(error);
    }
  };

  return (
    <div className={styles.document}>
      <Card
        title={docState.category}
        style={{ width: 300 }}
        actions={[
          <DownloadOutlined onClick={handleDownload} />,
          <DeleteOutlined onClick={handleDelete} />,
        ]}
      >
        <Paragraph
          editable={{ onChange: handleChange, tooltip: 'click to edit name' }}
          style={{ paddingTop: '1%' }}
        >
          {docState.name}
        </Paragraph>
      </Card>
    </div>
  );
};

{
  /* <a
  href={document.location}
  target="_blank"
  rel="noopener noreferrer"
  style={{ marginLeft: '2%' }}
>
  <Button>
    <DownloadOutlined /> Download
  </Button>
</a> */
}

const confirmDelete = handleDelete =>
  Modal.confirm({
    title: 'Confirm',
    content: 'Are you sure you want to delete this document?',
    okText: 'Delete',
    onOk: handleDelete,
    cancelText: 'Cancel',
  });

export default Document;
