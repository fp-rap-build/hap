import styles from '../../../../../../styles/pages/request.module.css';

import { Checkbox, Typography } from 'antd';
const { Title } = Typography;

const marginFix = {
  marginLeft: '0',
};

const Checklist = ({ handleCheckboxChange, request }) => {
  return (
    <div className={styles.checklistsContainer}>
      <PreApprovalChecklist
        handleCheckboxChange={handleCheckboxChange}
        request={request}
      />
      <PostApprovalChecklist
        handleCheckboxChange={handleCheckboxChange}
        request={request}
      />
    </div>
  );
};

const PreApprovalChecklist = ({ handleCheckboxChange, request }) => {
  return (
    <div className={styles.checklist}>
      <Title level={5}>Pre-Approval Checklist</Title>
      <Checkbox
        checked={request.verifiedDocuments}
        name="verifiedDocuments"
        onChange={handleCheckboxChange}
      >
        All documents received and verified
      </Checkbox>
      <Checkbox
        checked={request.pmApproval}
        name="pmApproval"
        onChange={handleCheckboxChange}
        style={marginFix}
      >
        Approved by program manager
      </Checkbox>
      <Checkbox
        checked={request.verifiedLedger}
        name="verifiedLedger"
        onChange={handleCheckboxChange}
        style={marginFix}
      >
        Rent payment ledger received from landlord
      </Checkbox>
    </div>
  );
};

const PostApprovalChecklist = ({ request, handleCheckboxChange }) => {
  return (
    <div className={styles.checklist}>
      <Title level={5}>Post-Approval Checklist</Title>
      <Checkbox
        checked={request.checkRequested}
        name="checkRequested"
        onChange={handleCheckboxChange}
      >
        Request for check sent
      </Checkbox>
      <Checkbox
        checked={request.checkSent}
        name="checkSent"
        onChange={handleCheckboxChange}
        style={marginFix}
      >
        Check sent to applicant
      </Checkbox>
      <Checkbox
        checked={request.checkReceived}
        name="checkReceived"
        onChange={handleCheckboxChange}
        style={marginFix}
      >
        Check received/ cashed by applicant
      </Checkbox>
    </div>
  );
};

export default Checklist;
