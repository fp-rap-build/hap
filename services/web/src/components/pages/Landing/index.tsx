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
          <h1 className={styles.title}>
            Are you in need of Housing Assistance?
          </h1>
          <p></p>
          <Button onClick={redirectToRentalAssistanceForm}>
            Check Eligibility and Apply
          </Button>
          <br />
          <h5>Already have an account? </h5>
          <Button>
            <Link style={{ color: '#FFFFFF' }} to="/login">
              Login to view your status
            </Link>
          </Button>
          <h5>Landlord who needs access to tenant requests? </h5>
          <Button>
            <Link style={{ color: '#FFFFFF' }} to="/login/landlord">
              Create Landlord Account
            </Link>
          </Button>
        </div>
      </header>
    </div>
  );
}
