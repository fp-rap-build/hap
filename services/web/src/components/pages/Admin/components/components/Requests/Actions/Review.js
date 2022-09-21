import EditIcon from '@material-ui/icons/Edit';

import Container from './Container';

import { useHistory } from 'react-router';

export default function Review({ requestId }) {
  const history = useHistory();

  const redirectToRequest = () => history.push(`/requests/${requestId}`);

  return (
    <Container onClick={redirectToRequest}>
      <EditIcon />
    </Container>
  );
}
