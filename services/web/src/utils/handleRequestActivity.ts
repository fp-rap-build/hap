import { axiosWithAuth } from '../api/axiosWithAuth';

const handleRequestActivity = async (userRole, request) => {
  try {
    if (userRole === 'tenant') {
      await axiosWithAuth().put(`/requests/${request.id}`, {
        latestTenantActivity: new Date().toISOString(),
      });
    } else {
      await axiosWithAuth().put(`/requests/${request.id}`, {
        latestStaffActivity: new Date().toISOString(),
      });
    }
    console.log('check');
  } catch (error) {
    console.log('Error in request activity util');
    console.log(error);
  }
  if (request) {
  }
};

export default handleRequestActivity;
