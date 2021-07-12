import calcCurrentTime from './dates/calcCurrentTime';

import { axiosWithAuth } from '../api/axiosWithAuth';

const handleRequestActivity = async (userRole, request) => {
  try {
    if (userRole === 'tenant') {
      await axiosWithAuth().put(`/requests/${request.requestId}`, {
        latestTenantActivity: new Date().toISOString(),
      });
    } else {
      await axiosWithAuth().put(`/requests/${request.requestId}`, {
        latestStaffActivity: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.log('Error in request activity util');
    console.log(error);
  }
  if (request) {
  }
};

export default handleRequestActivity;
