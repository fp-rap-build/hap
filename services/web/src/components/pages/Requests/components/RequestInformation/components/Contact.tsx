import React from 'react';

import { Descriptions } from 'antd';

import styles from '../../../../../../styles/pages/request.module.css';

export default function Contact({ request, column = 2 }) {
  return (
    <div className={styles.contact}>
      <div>
        <h2>Landlord</h2>

        <h3>Name:</h3>
        <h3>
          
            {request.landlordName}
      
        </h3>
      </div>
      <div>
        <h2>Contact Information</h2>
        <h3>Email:</h3>
        <h3>
          <a href={`mailto:${request.landlordEmail}`}>{request.landlordEmail}</a>
        </h3>
        <h2>Phone number:</h2>
        <h3>{request.landlordNumber}</h3>
      </div>
    </div>
  );
}
