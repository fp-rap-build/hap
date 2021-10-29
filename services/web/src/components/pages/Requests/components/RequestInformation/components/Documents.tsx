import { useState, useEffect } from 'react';

import Document from './Document';
import SelfDecDocument from './SelfDecDocument';

import { Select } from 'antd';

import styles from '../../../../../../styles/pages/request.module.css';

const { Option } = Select;

export default function Documents({ documents, setDocuments }) {
  const [category, setCategory] = useState('all');
  const [originalDocuments, setOriginalDocuments] = useState(documents);

  const handleCategoryChange = cat => setCategory(cat);

  const props = {
    documents,
    setDocuments,
    setOriginalDocuments,
    category,
    setCategory,
  };

  useEffect(() => {
    if (category === 'all') {
      return setDocuments(originalDocuments);
    }

    setDocuments(originalDocuments.filter(doc => doc.category === category));
    //eslint-disable-next-line
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
    <Select
      defaultValue="all"
      style={{ width: 120, marginBottom: '1rem' }}
      onChange={handleChange}
    >
      <Option value="all">All</Option>
      <Option value="childrenOrPregnancy">Children</Option>
      <Option value="residency">Residency</Option>
      <Option value="income">Income</Option>
      <Option value="housingInstability">Housing</Option>
      <Option value="covid">Covid</Option>
      <Option value="rpaf">RPAF</Option>
      <Option value="upaf">UPAF</Option>
      <Option value="other">Other</Option>
      <Option value="identity">Identity</Option>
    </Select>
  );
};

const RenderDocuments = ({ documents, setDocuments, setOriginalDocuments }) => {
  return (
    <div className={styles.documents}>
      {documents.map(d =>
        d.pandaId ? (
          <SelfDecDocument
            key={d.id}
            document={d}
            setDocuments={setDocuments}
            setOriginalDocuments={setOriginalDocuments}
          />
        ) : (
          <Document
            key={d.id}
            document={d}
            setDocuments={setDocuments}
            setOriginalDocuments={setOriginalDocuments}
          />
        )
      )}
    </div>
  );
};
