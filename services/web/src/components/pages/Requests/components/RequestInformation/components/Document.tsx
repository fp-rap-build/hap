import { useState } from 'react';

import {
  Typography,
  Button,
  Card,
  Modal,
  message,
  Tooltip,
  Select,
} from 'antd';

import {
  DownloadOutlined,
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
} from '@ant-design/icons';

import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

import styles from '../../../../../../styles/pages/request.module.css';

const { Paragraph } = Typography;

const { Option } = Select;

const Document = ({ document, setDocuments }) => {
  const [docState, setDocState] = useState(document);
  const [editing, setEditing] = useState(false);

  const handleChange = (value, key) => {
    console.log(key);
  };

  const handleCategoryChange = newCategory => {
    setDocState({ ...docState, category: newCategory });
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

  const postDocChange = async () => {
    setEditing(false);

    try {
      const res = await axiosWithAuth().put(
        `documents/${docState.id}`,
        docState
      );

      setDocuments(prevState =>
        prevState.map(doc => {
          if (doc.id == docState.id) {
            return docState;
          }
          return doc;
        })
      );
    } catch (error) {
      alert('Unable to update document name');
      console.error(error);
    }
  };

  const props = {
    editing,
    setEditing,
    category: docState.category,
    doc: docState,
    handleChange,
    handleCategoryChange,
    postDocChange,
  };

  return (
    <div className={styles.document}>
      <Card
        title={<RenderCategory {...props} />}
        style={{ width: '100%' }}
        extra={
          <a>
            <RenderEditIcon {...props} />
          </a>
        }
        actions={[
          <DownloadOutlined onClick={handleDownload} />,
          <DeleteOutlined onClick={handleDelete} />,
        ]}
      >
        <Tooltip title={docState.name}>{chopDocName(docState.name)}</Tooltip>
      </Card>
    </div>
  );
};

const RenderCategory = ({ category, editing, doc, handleCategoryChange }) => {
  if (editing) {
    return (
      <Select
        defaultValue={doc.category}
        key="category"
        style={{ width: 160 }}
        onChange={handleCategoryChange}
      >
        <Option value="residency">residency</Option>
        <Option value="income">income</Option>
        <Option value="housingInstability">housing</Option>
        <Option value="covid">covid</Option>
      </Select>
    );
  }

  return category;
};

const RenderEditIcon = ({ editing, setEditing, postDocChange }) => {
  if (editing) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <p onClick={() => setEditing(false)}>X</p>
        <CheckOutlined onClick={postDocChange} />
      </div>
    );
  }

  return <EditOutlined onClick={() => setEditing(true)} />;
};

const chopDocName = docName => {
  if (docName.length >= 30) return docName.slice(0, 30) + ' ..';

  return docName;
};

const confirmDelete = handleDelete =>
  Modal.confirm({
    title: 'Confirm',
    content: 'Are you sure you want to delete this document?',
    okText: 'Delete',
    onOk: handleDelete,
    cancelText: 'Cancel',
  });

export default Document;
