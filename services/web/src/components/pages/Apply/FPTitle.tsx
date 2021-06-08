import { Typography, Image } from 'antd';

import goldStar from '../../../assets/FP-star-gold.png';

const { Title } = Typography;

const FPTitle = ({ title }) => {
  return (
    <div className="fpCardTitle">
      <Image width={'1rem'} src={goldStar} />
      <Title level={3} style={{ color: 'white', marginLeft: '30px' }}>
        {title}
      </Title>
    </div>
  );
};

export default FPTitle;
