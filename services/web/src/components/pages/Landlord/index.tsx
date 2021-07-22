import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../../common/LoadingComponent';

import { fetchMultiRequests } from '../../../redux/requests/requestActions';

import ActiveRequestsTable from './components/ActiveRequestsTable';

import { Typography, Layout, Badge } from 'antd';
const { Content, Header, Footer } = Layout;
const { Title } = Typography;

export default function Index() {
  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.global.isLoading);
  const currentUser = useSelector(state => state.user.currentUser);

  useEffect(() => {
    dispatch(fetchMultiRequests({ landlordEmail: currentUser.email }));
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {isLoading && <LoadingComponent />}
      {!isLoading && <RenderDash currentUser={currentUser} />}
    </>
  );
}

const RenderDash = ({ currentUser }) => {
  return (
    <Layout>
      <Header style={{ backgroundColor: '#472d5b' }}>
        <Title level={3} style={{ color: '#FFFFFF' }}>
          Hello {currentUser.firstName}, welcome to you HAP Portal!{' '}
        </Title>
      </Header>
      <Content>
        <ActiveRequestsTable />
      </Content>
      <Footer></Footer>
    </Layout>
  );
};
