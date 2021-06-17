import React from 'react';

import { Descriptions } from 'antd';

import styles from '../../../../../../styles/pages/request.module.css';

export default function Contact({ request, column = 2 }) {
  return (
    <div className={styles.contact}>
      <div>
        <h3>Landlord</h3>

        <h4>Name:</h4>
        <h4>{request.landlordName}</h4>

        <h3>Address:</h3>
        <h4>{request.landlordAddress}</h4>
        <h4>{request.landlordAddress2}</h4>
        <h4>
          {request.landlordCity} , {request.landlordState} {request.landlordZip}
        </h4>
      </div>
      <div>
        <h3>Contact Information</h3>

        <h4>
          Email:
          <a href={`mailto:${request.landlordEmail}`}>
            {request.landlordEmail}
          </a>
        </h4>
        <h3>Phone number:</h3>
        <h4>{request.landlordNumber}</h4>

        <h3>Prefered Payment Method:</h3>

        <h3>E-Pay Information</h3>
        <h4>Account Number: </h4>
        <h4>Routing Number: </h4>
      </div>
    </div>
  );
}
