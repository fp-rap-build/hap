import { useState, useEffect } from 'react';

import Document from './Document';

import { Select } from 'antd';

import styles from '../../../../../../styles/pages/request.module.css';
import { DvrOutlined } from '@material-ui/icons';

const { Option } = Select;

export default function Documents({ documents, setDocuments }) {
  const [category, setCategory] = useState('all');
  const [originalDocuments, setOriginalDocuments] = useState(documents);

  const handleCategoryChange = cat => setCategory(cat);

  const props = {
    documents,
    setDocuments,
    category,
    setCategory,
  };

  useEffect(() => {
    if (category === 'all') {
      return setDocuments(originalDocuments);
    }

    setDocuments(
      originalDocuments.filter(doc => {
        if (doc.category === category) return doc;
      })
    );
  }, [category]);

  return (
    <div>
      <ChangeCategoryButton handleChange={handleCategoryChange} />
      <RenderDocuments {...props} />
    </div>
  );
}

const ChangeCategoryButton = ({ handleChange }) => {
  return (
    <Select defaultValue="all" style={{ width: 120 }} onChange={handleChange}>
      <Option value="all">All</Option>
      <Option value="residency">Residency</Option>
      <Option value="income">Income</Option>
      <Option value="housingInstability">Housing</Option>
      <Option value="covid">Covid</Option>
    </Select>
  );
};

const RenderDocuments = ({ documents, setDocuments }) => {
  return (
    <div className={styles.documents}>
      {documents.map(d => (
        <Document key={d.id} document={d} setDocuments={setDocuments} />
      ))}
    </div>
  );
};
