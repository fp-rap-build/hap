import React from 'react';

import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom';

import styles from '../../../styles/pages/landing.module.css';

import Button from '../../common/Button';

export default function Index() {
  const history = useHistory();
  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const redirectToRentalAssistanceForm = () => {
    history.push('/apply');
  };

  return (
    <div>
      <header
        className={styles.header}
        style={{ textAlign: 'center', padding: '1px' }}
      >
        <div className={styles.contentContainer}>
          <h1>Are you in need of Housing Assistance?</h1>

          <h2>Check your eligibility by following the link below</h2>

          <Button onClick={() => history.push('/applyv2')}>
            Check Eligibility and Apply
          </Button>
          {/*<Button onClick={() => history.push('/applyv2')}>*/}
          {/*  Click here for status updates from Spokane City*/}
          {/*</Button>*/}

          {/* <br />
          <h5>If you're a landlord or tenant, log in to view your status.</h5>
          <Button>
            <Link style={{ color: '#FFFFFF' }} to="/login">
              Login to view your status
            </Link>
          </Button>
          <br />
          <h5 style={{ textAlign: 'center' }}>
            Landlords, you can create an account here to see if a tenant has
            applied.
          </h5>
          <Button>
            <Link style={{ color: '#FFFFFF' }} to="/register/landlord">
              Create Landlord Account
            </Link>
          </Button> */}
        </div>
      </header>
    </div>
  );
}
