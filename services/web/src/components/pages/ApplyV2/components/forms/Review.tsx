import ReviewInformation from './ReviewCards';

import { Button, Card } from 'antd';

export default function Review({ formValues, setCurrentContent }) {
  return (
    <Card>
      <ReviewInformation
        formValues={formValues}
        setContent={setCurrentContent}
      />
      <Button onClick={() => setCurrentContent('submit')}>Next</Button>
    </Card>
  );
}
