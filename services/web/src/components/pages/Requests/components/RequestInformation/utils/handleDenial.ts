import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

const handleDenial = async (request, setRequest, status) => {
  try {
    await axiosWithAuth().put(`/requests/${request.id}`, {
      requestStatus: status,
    });

    setRequest({ ...request, requestStatus: status });
  } catch (error) {
    alert('Failed to review user');
  }
};

export default handleDenial;
