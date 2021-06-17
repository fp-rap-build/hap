import { Button } from 'antd';

export default function EditButton({ disabled, setDisabled, onCancel }) {
  if (!disabled) {
    return (
      <div>
        <Button htmlType="submit">Submit</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    );
  }

  return (
    <Button type="primary" onClick={() => setDisabled(false)}>
      Edit
    </Button>
  );
}
