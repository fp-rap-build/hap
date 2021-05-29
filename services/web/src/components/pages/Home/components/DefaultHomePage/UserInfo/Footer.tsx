import { Button } from 'antd';

const Footer = ({
  toggleDisabled,
  disabled,
  postAddress,
  postRequest,
  currentContent,
}) => {
  const save = () => {
    try {
      if (currentContent === 'address') {
        postAddress();
      } else {
        postRequest();
      }
    } catch (error) {
      alert('Error Saving User Data to Server');
    } finally {
      toggleDisabled();
    }
  };

  return (
    <div style={currentContent === 'income' ? { display: 'none' } : null}>
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
