import { Typography, Checkbox } from 'antd';

const DemoInfo = ({ requestData, handleRequestChange }) => {
  return (
    <>
      <div className="demographicInfo userInfoContent">
        <Typography.Title level={3}>Demographic Info:</Typography.Title>
        <Checkbox
          checked={requestData.hispanic}
          name="hispanic"
          onChange={handleRequestChange}
        >
          Hispanic/ Latino
        </Checkbox>
        <Checkbox
          checked={requestData.asian}
          name="asian"
          onChange={handleRequestChange}
        >
          Asian
        </Checkbox>
        <Checkbox
          checked={requestData.black}
          name="black"
          onChange={handleRequestChange}
        >
          Black or African American
        </Checkbox>
        <Checkbox
          checked={requestData.pacific}
          name="pacific"
          onChange={handleRequestChange}
        >
          Native Hawaiian or Other Pacific Islander
        </Checkbox>
        <Checkbox
          checked={requestData.white}
          name="white"
          onChange={handleRequestChange}
        >
          White
        </Checkbox>
        <Checkbox
          checked={requestData.native}
          name="native"
          onChange={handleRequestChange}
        >
          Native American or Alskan Native
        </Checkbox>
        <Checkbox
          checked={requestData.demoNotSay}
          name="demoNotSay"
          onChange={handleRequestChange}
        >
          Rather Not Say
        </Checkbox>
      </div>
    </>
  );
};

export default DemoInfo;
