import { Button } from 'antd';

const Footer = ({ toggleDisabled, disabled, postAddress }) => {
  const save = () => {
    try {
      postAddress();
    } catch (error) {
      alert('Error Saving User Data to Server');
    } finally {
      toggleDisabled();
    }
  };

  return (
    <div>
      {disabled ? <Button onClick={toggleDisabled}>Edit</Button> : null}
      {!disabled ? (
        <>
          <Button onClick={save}>Save Changes</Button>
          <Button onClick={toggleDisabled}>Cancel</Button>
        </>
      ) : null}
    </div>
  );
};

export default Footer;
