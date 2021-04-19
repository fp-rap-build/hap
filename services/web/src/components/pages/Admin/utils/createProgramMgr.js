import { axiosWithAuth } from '../../../../api/axiosWithAuth';

const createProgramMgr = async user => {
  const { firstName, lastName, email, role, organizationId, password } = user;

  const newAcctMgr = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: password,
    role: role,
    organizationId: organizationId,
  };

  try {
    await axiosWithAuth().post('/user', newAcctMgr);
    return `Succesfully created Program Manager ${firstName} ${lastName}`;
  } catch (error) {
    console.error(error.response);
    throw new Error('Unable to create program manager');
  }
};

export default createProgramMgr;
