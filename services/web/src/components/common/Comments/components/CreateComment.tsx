import { Input } from 'antd';

const { TextArea } = Input;

const CreateComment = ({ newComment, setNewComment }) => {
  const handleChange = e => {
    setNewComment({ text: e.target.value });
  };

  return (
    <>
      <TextArea
        rows={4}
        placeholder="Add a comment to the request"
        value={newComment.text}
        onChange={handleChange}
      />
    </>
  );
};

export default CreateComment;
