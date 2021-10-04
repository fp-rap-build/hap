import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { axiosWithAuth } from '../../../api/axiosWithAuth';

import LoadingComponent from '../../common/LoadingComponent';

import styles from '../../../styles/pages/profile.module.css';

import { Descriptions, Comment } from 'antd';
import { formatUTC } from '../../../utils/dates';

import DocumentViewer from '../../common/DocumentViewer';

import { Table, Tag, Space } from 'antd';

const columns = [
  {
    title: 'Account #',
    dataIndex: 'accountNumber',
    key: 'accountNumber',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Amount Forward',
    dataIndex: 'amountForward',
    key: 'amountForward',
  },

  {
    title: 'Amount Back',
    key: 'amountBack',
    dataIndex: 'amountBack',
  },

  {
    title: 'Months Back',
    key: 'monthsBack',
    dataIndex: 'monthsBack',
  },

  {
    title: 'Months Forward',
    key: 'monthsForward',
    dataIndex: 'monthsForward',
  },

  {
    title: 'Renter or Owner',
    key: 'renterOrOwner',
    dataIndex: 'renterOrOwner',
  },

  {
    title: 'Total Arrears',
    key: 'totalArrears',
    dataIndex: 'totalArrears',
  },
  {
    title: 'Created at',
    key: 'createdAt',
    dataIndex: 'createdAt',
  },
];

export default function Index() {
  let { id: requestId } = useParams();

  let [profile, setProfile] = useState({
    payments: [],
    documents: [],
    comments: [],
    request: {
      firstName: null,
      lastName: null,
      email: null,
      tenantPhone: null,
      address: null,
      addressLine2: null,
      state: null,
      cityName: null,
      zipCode: null,
      familySize: null,
      beds: null,
      totalChildren: null,
      monthlyIncome: null,
      monthlyRent: null,
      owed: null,
      amountRequested: null,
      unEmp90: null,
      foodWrkr: null,
      hispanic: null,
      asian: null,
      black: null,
      pacific: null,
      white: null,
      native: null,
      demoNotSay: null,
      landlordName: null,
      landlordAddress: null,
      landlordAddressLine2: null,
    },
  });

  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosWithAuth()
      .get(`/requests/${requestId}/profile`)
      .then(res => {
        console.log(res.data);
        setProfile(res.data);
      })
      .catch(err => {
        alert('Unable to fetch profile');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className={styles.container}>
      <h1>Request information</h1>

      <Descriptions title="Contact Info">
        <Descriptions.Item label="firstName">
          {profile.request.firstName}
        </Descriptions.Item>
        <Descriptions.Item label="lastName">
          {profile.request.lastName}
        </Descriptions.Item>
        <Descriptions.Item label="email">
          {profile.request.email}
        </Descriptions.Item>
        <Descriptions.Item label="phone">
          {profile.request.tenantPhone}
        </Descriptions.Item>
        <Descriptions.Item label="dob">{profile.request.dob}</Descriptions.Item>
      </Descriptions>

      <Descriptions title="Address">
        <Descriptions.Item label="street">
          {profile.request.address}
        </Descriptions.Item>
        <Descriptions.Item label="street line 2">
          {profile.request.addressLine2}
        </Descriptions.Item>

        <Descriptions.Item label="state">
          {profile.request.state}
        </Descriptions.Item>
        <Descriptions.Item label="cityName">
          {profile.request.cityName}
        </Descriptions.Item>
        <Descriptions.Item label="zipCode">
          {profile.request.zipCode}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions title="Household">
        <Descriptions.Item label="familySize">
          {profile.request.familySize}
        </Descriptions.Item>
        <Descriptions.Item label="bedrooms">
          {profile.request.beds}
        </Descriptions.Item>
        <Descriptions.Item label="totalChildren">
          {profile.request.totalChildren}
        </Descriptions.Item>
        <Descriptions.Item label="monthlyIncome">
          {profile.request.monthlyIncome}
        </Descriptions.Item>
        <Descriptions.Item label="monthlyRent">
          {profile.request.monthlyRent}
        </Descriptions.Item>
        <Descriptions.Item label="owed">
          {profile.request.owed}
        </Descriptions.Item>
        <Descriptions.Item label="amountRequested">
          {profile.request.amountRequested}
        </Descriptions.Item>
        <Descriptions.Item label="unEmp90">
          {profile.request.unEmp90 ? 'Yes' : 'No'}
        </Descriptions.Item>
        <Descriptions.Item label="foodWrkr">
          {profile.request.foodWrkr ? 'Yes' : 'No'}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions title="Demographics">
        <Descriptions.Item label="hispanic">
          {profile.request.hispanic ? 'Yes' : 'No'}
        </Descriptions.Item>
        <Descriptions.Item label="asian">
          {profile.request.asian ? 'Yes' : 'No'}
        </Descriptions.Item>
        <Descriptions.Item label="black">
          {profile.request.black ? 'Yes' : 'No'}
        </Descriptions.Item>
        <Descriptions.Item label="pacific">
          {profile.request.pacific ? 'Yes' : 'No'}
        </Descriptions.Item>
        <Descriptions.Item label="white">
          {profile.request.white ? 'Yes' : 'No'}
        </Descriptions.Item>

        <Descriptions.Item label="native">
          {profile.request.native ? 'Yes' : 'No'}
        </Descriptions.Item>

        <Descriptions.Item label="demoNotSay">
          {profile.request.demoNotSay ? 'Yes' : 'No'}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions title="Landlord">
        <Descriptions.Item label="landlordName">
          {profile.request.landlordName}
        </Descriptions.Item>
        <Descriptions.Item label="landlordAddress">
          {profile.request.landlordAddress}
        </Descriptions.Item>
        <Descriptions.Item label="landlordAddressLine2">
          {profile.request.landlordAddressLine2}
        </Descriptions.Item>
        <Descriptions.Item label="landlordState">
          {profile.request.landlordState}
        </Descriptions.Item>
        <Descriptions.Item label="landlordCity">
          {profile.request.landlordCity}
        </Descriptions.Item>

        <Descriptions.Item label="landlordZip">
          {profile.request.landlordZip}
        </Descriptions.Item>

        <Descriptions.Item label="landlordEmail">
          {profile.request.landlordEmail}
        </Descriptions.Item>

        <Descriptions.Item label="landlordPhoneNumber">
          {profile.request.landlordPhoneNumber}
        </Descriptions.Item>
      </Descriptions>

      <h1>Payments</h1>

      <Table columns={columns} dataSource={profile.payments} />

      <h1>Internal Comments</h1>

      <div>
        {profile.comments.map(comm => {
          if (comm.category === 'internal') {
            return (
              <Comment
                author={formatAuthor(comm)}
                datetime={formatUTC(comm.createdAt)}
                content={<p>{comm.comment}</p>}
              />
            );
          }
        })}
      </div>

      <h1>External Comments</h1>

      <div>
        {profile.comments.map(comm => {
          if (comm.category === 'external') {
            return (
              <Comment
                author={formatAuthor(comm)}
                datetime={formatUTC(comm.createdAt)}
                content={<p>{comm.comment}</p>}
              />
            );
          }
        })}
      </div>

      <h1>Documents</h1>

      <div>
        {profile.documents.map(doc => {
          return <DocumentViewer document={doc} />;
        })}
      </div>
    </div>
  );
}

const formatAuthor = comm => {
  const author =
    comm.role === 'tenant' || comm.role === 'landlord'
      ? comm.firstName + ' ' + comm.lastName
      : comm.firstName;

  return author;
};
