import { useState } from 'react';

import { Card, Select, Input, Tooltip, Spin, Modal, message } from 'antd';

import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';
import { axiosForPanda } from '../../../../../../api/axiosForPanda';

import {
  DownloadOutlined,
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
} from '@ant-design/icons';

const { Option } = Select;

const SelfDecDocument = ({ document, setDocuments, setOriginalDocuments }) => {
  const [docState, setDocState] = useState(document);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleDelete = () => {
    const deleteDocument = async () => {
      try {
        //Deleted doc from pandaDoc
        await axiosForPanda().delete(`/documents/${docState.pandaId}`);

        //Delete refernce to doc in DB
        await axiosWithAuth().delete(`/documents/${docState.id}`);

        //update local state
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

  const pandaDocDownload = async () => {
    setLoading(true);
    try {
      const dlDoc = await axiosForPanda().get(
        `/documents/${docState.pandaId}/download`,
        { responseType: 'blob' }
      );
      //Create a blob from the PDF Stream
      const file = new Blob([dlDoc.data], { type: 'application/pdf' });
      //Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      //Open URL in new window
      window.open(fileURL);
    } catch (error) {
      alert('Unable to download document from PandaDocs.');
      console.log(error);
    } finally {
      setLoading(false);
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
    <div>
      <Card
        title={<RenderCategory {...props} />}
        style={{ width: '100%' }}
        extra={
          <a>
            <RenderEditIcon {...props} />
          </a>
        }
        actions={[
          loading ? (
            <Spin size="small" />
          ) : (
            <DownloadOutlined onClick={pandaDocDownload} />
          ),
          <DeleteOutlined onClick={handleDelete} />,
        ]}
      >
        <RenderName name={docState.name} {...props} />
      </Card>
    </div>
  );
};

//--------SUB COMPONENTS AND HELPERS --------//
const RenderCategory = ({ editing, doc, handleCategoryChange }) => {
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
        <Option value="other">other</Option>
      </Select>
    );
  }

  return doc.category;
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

const RenderName = ({ editing, name, handleNameChange }) => {
  if (editing) {
    return <Input value={name} onChange={handleNameChange} />;
  }

  return <Tooltip title={name}>{chopDocName(name)}</Tooltip>;
};

const confirmDelete = handleDelete =>
  Modal.confirm({
    title: 'Confirm',
    content: 'Are you sure you want to delete this document?',
    okText: 'Delete',
    onOk: handleDelete,
    cancelText: 'Cancel',
  });

export default SelfDecDocument;
