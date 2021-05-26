import EditableText from '../../common/EditableText';

import EditableNum from '../../common/EditableNum';

import { Typography, Checkbox, Divider } from 'antd';

const DemoInfo = ({
  requestData,
  handleRequestChange,
  handleNumChange,
  setRequestData,
}) => {
  return (
    <>
      <div className="demographicInfo">
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
      <Divider />
      <div className="householdInfo">
        <Typography.Title level={3}>Household Info:</Typography.Title>
        <Checkbox
          checked={requestData.foodWrkr}
          name="foodWrkr"
          onChange={handleRequestChange}
        >
          Worked in Food Service
        </Checkbox>
        <Checkbox
          checked={requestData.unEmp90}
          name="unEmp90"
          onChange={handleRequestChange}
        >
          Unemployed in the past 90 days
        </Checkbox>
        <EditableNum
          title="Family Size"
          name="familySize"
          handleNumChange={handleNumChange}
          state={requestData}
          setState={setRequestData}
        />
        <EditableNum
          title="Numbe of Children"
          name="numChildren"
          handleNumChange={handleNumChange}
          state={requestData}
          setState={setRequestData}
        />
        <EditableNum
          title="Monthly Income"
          name="monthlyIncome"
          handleNumChange={handleNumChange}
          state={requestData}
          setState={setRequestData}
        />
        <EditableNum
          title="Monthly Rent"
          name="monthlyRent"
          handleNumChange={handleNumChange}
          state={requestData}
          setState={setRequestData}
        />
      </div>
    </>
  );
};

export default DemoInfo;
