import { Card } from 'antd';
import Address from './cards/Address';
import Household from './cards/Household';
import Demographics from './cards/Demographics';
import Additional from './cards/Additional';
import SecondaryContact from './cards/SecondaryContact';

import styles from '../../../../../../styles/pages/apply.module.css';

export default function Index({ formValues, setContent }) {
  let props = { formValues, setContent };

  return (
    <Card headStyle={{ background: ' #472D5B' }}>
      <div className={styles.review}>
        <p>
          Please carefully review the following information prior to applying
          for Rental Assistance through Fanmily Promise of Spokane. Incorrect
          information here will greatly increase the amount of time needed to
          process your request.
        </p>
        <SecondaryContact content="landlord" {...props} />
        <Address content="address" {...props} />
        <Household content="household" {...props} />
        <Demographics content="demographics" {...props} />
        {/* 
        <Additional step={3} {...props} /> */}
      </div>
    </Card>
  );
}
