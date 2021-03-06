import { Card } from 'antd';
import FPTitle from '../../../FPTitle';

import Basic from './cards/Basic';
import Household from './cards/Household';
import Demographics from './cards/Demographics';
import Additional from './cards/Additional';
import SecondaryContact from './cards/SecondaryContact';

import styles from '../../../../../../styles/pages/apply.module.css';

export default function Index({ formValues, setStep }) {
  let props = { formValues, setStep };

  return (
    <Card
      title={<FPTitle title="Review Information" />}
      headStyle={{ background: ' #472D5B' }}
    >
      <div className={styles.review}>
        <p>
          Please carefully review the following information prior to applying
          for Rental Assistance through Fanmily Promise of Spokane. Incorrect
          information here will greatly increase the amount of time needed to
          process your request.
        </p>
        <Basic step={0} {...props} />
        <Household step={1} {...props} />
        <Demographics step={2} {...props} />
        <Additional step={3} {...props} />
        <SecondaryContact step={5} {...props} />
      </div>
    </Card>
  );
}
