import { axiosWithAuth } from '../../../../api/axiosWithAuth';

const getFormattedDate = () => {
  const now = new Date();
  const currentDate =
    now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
  const currentTime =
    now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
  return currentDate + ' ' + currentTime;
};

const formatDate = dtg => {
  if (!dtg) {
    return null;
  }

  const stringCheck = String(dtg);

  const dtgSplit = stringCheck.split('T');
  const date = dtgSplit[0].split('-');
  const time = dtgSplit[1].split(':');

  return `${date[1]}/${date[2]} @ ${time[0]}:${time[1]}`;
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
  } catch (error) {
    console.log(error);
  }
};

export { checkCommentLength, getFormattedDate, formatDate, fetchComments };
