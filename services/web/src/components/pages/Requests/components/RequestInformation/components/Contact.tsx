import React from 'react';

import { Descriptions } from 'antd';

import styles from '../../../../../../styles/pages/request.module.css';

export default function Contact({ request, column = 2 }) {
  return (
    <div className={styles.contact}>
      <div>
        <h1>Landlord</h1>
        <h2>Email:</h2>
        <h3>
          <a href={`mailto:${request.landlordEmail}`}>
            {request.landlordEmail}
          </a>
        </h3>
        <h2>Phone number:</h2>
        <h3>{request.landlordNumber}</h3>
      </div>
      <div>
        <h1>Tenant</h1>
        <h2>Email:</h2>
        <h3>
          <a href={`mailto:${request.tenantEmail}`}>{request.tenantEmail}</a>
        </h3>
        <h2>Phone number:</h2>
        <h3>{request.tenantNumber}</h3>
      </div>
    </div>
  );
}
