import { useState } from 'react';

import {
  Typography,
  Button,
  Card,
  Modal,
  message,
  Tooltip,
  Select,
  Input,
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

const Document = ({ document, setDocuments, setOriginalDocuments }) => {
  const [docState, setDocState] = useState(document);
  const [editing, setEditing] = useState(false);

  const handleNameChange = e => {
    setDocState({ ...docState, name: e.target.value });
  };

  const handleCategoryChange = newCategory => {
    setDocState({ ...docState, category: newCategory });
  };

  const handleCancel = () => {
    setDocState(document);

    setEditing(false);
  };

  const handleDownload = () => window.open(docState.location, '_blank');

  const handleDelete = () => {
    const deleteDocument = async () => {
      try {
        await axiosWithAuth().delete(`/documents/${docState.id}`);

        setDocuments(prevState =>
          prevState.filter(doc => doc.id !== docState.id)
        );

        setOriginalDocuments(prevState =>
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

      setOriginalDocuments(prevState =>
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
    handleNameChange,
    handleCategoryChange,
    handleCancel,
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
        <RenderName name={docState.name} {...props} />
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
        <Option value="childrenOrPregnancy">children</Option>
        <Option value="residency">residency</Option>
        <Option value="income">income</Option>
        <Option value="housingInstability">housing</Option>
        <Option value="covid">covid</Option>
        <Option value="rpaf">RPAF</Option>
        <Option value="lease">Lease</Option>
        <Option value="landlordW9">Landlord W9</Option>
        <Option value="other">other</Option>
      </Select>
    );
  }

  return doc.category;
};

const RenderName = ({ editing, name, handleNameChange }) => {
  if (editing) {
    return <Input value={name} onChange={handleNameChange} />;
  }

  return <Tooltip title={name}>{chopDocName(name)}</Tooltip>;
};

const RenderEditIcon = ({
  editing,
  setEditing,
  handleCancel,
  postDocChange,
}) => {
  if (editing) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <p onClick={handleCancel}>X</p>
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
