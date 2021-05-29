import { axiosWithAuth } from '../../../../api/axiosWithAuth';

const formatDate = dtg => {
  if (!dtg) {
    return null;
  }

  let localtime = new Date(dtg).toLocaleString();

  return localtime;
};

const checkCommentLength = comm => {
  if (comm.text.length < 10) {
    return true;
  }
  return false;
};

const fetchComments = async (id, category, setState) => {
  try {
    const res = await axiosWithAuth().post(
      `/comments/find/request/${id}/category`,
      { category: category }
    );
    setState(res.data);
  } catch (error) {}
};

export { checkCommentLength, formatDate, fetchComments };
