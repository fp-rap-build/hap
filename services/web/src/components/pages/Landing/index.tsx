import React from 'react';

import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom';

import styles from '../../../styles/pages/landing.module.css';

import Button from '../../common/Button';

export default function Index() {
  const history = useHistory();

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

          <h4>
            <strong> You CAN still apply now.</strong>
          </h4>

          <h4>
            <em>
              (Due to the volume of requests, it may take up to a month for us
              to respond.)
            </em>
          </h4>

          <Button onClick={redirectToRentalAssistanceForm}>
            Check Eligibility and Apply
          </Button>
          <Button onClick={() => history.push('/applyv2')}>
            Check Eligibility and Apply V2
          </Button>
          <br />
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
          </Button>
        </div>
      </header>
    </div>
  );
}
