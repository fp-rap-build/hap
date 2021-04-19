import { Alert } from 'antd';

const NoComment = () => {
  return (
    <div>
      <Alert
        message="No Comments To Display!"
        description="Have a question? Need Assistance? Leave a comment below."
        type="info"
        showIcon
      />
    </div>
  );
};

export default NoComment;
