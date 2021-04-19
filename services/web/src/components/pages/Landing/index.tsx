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
      <header className={styles.header}>
        <div className={styles.contentContainer}>
          <h1>Are you in need of Housing Assistance?</h1>
          <p>
            Many in our community owe back rent or are struggling to pay their
            current housing expenses. The Housing Assistance Portal connects
            landlords and tenants to community housing assistance resources for
            which they qualify
          </p>
          <Button onClick={redirectToRentalAssistanceForm}>
            Check Eligibility and Apply
          </Button>
          <h5>
            Already have an account?{' '}
            <Link style={{ color: '#4faaff' }} to="/login">
              Login to view your status
            </Link>
          </h5>
        </div>
      </header>
    </div>
  );
}
