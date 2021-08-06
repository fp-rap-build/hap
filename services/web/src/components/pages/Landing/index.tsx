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
          <h3 className={styles.title}>
            Funding for the first round of Housing Assistance has been
            exhausted.{' '}
          </h3>
          <h3 className={styles.title}>
            You may still apply for Housing Assistance through a planned second
            round of funding.
          </h3>
          <h3 className={styles.title}>
            Please be aware that due to the volume of requests it may take 4+
            weeks to receive a response.
          </h3>

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
          <br />
          <h5>Are you a landlord who needs access to tenants requests? </h5>
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
