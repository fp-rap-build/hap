import Comments from '../../../../../common/Comments';

import { Collapse } from 'antd';

const { Panel } = Collapse;

const CommentsContainer = ({ request }) => {
  return (
    <Collapse defaultActiveKey={['1']}>
      <Panel header="Applicant Comments" key="1">
        <Comments request={request} category="external" />
      </Panel>
      <Panel header="Internal Comments" key="2">
        <Comments request={request} category="internal" />
      </Panel>
    </Collapse>
  );
};

export default CommentsContainer;
