import useWindowDimensions from '../../../utils/useWindowDimensions';

import goldStar from '../../../assets/FP-star-gold.png';

import { Typography, Image } from 'antd';
const { Title } = Typography;

const FPTitle = ({ title }) => {
  const { width } = useWindowDimensions();

  return (
    <div className="fpCardTitle">
      <Image width={'2rem'} src={goldStar} />
      <Title
        level={width < 400 ? 5 : 4}
        style={{ color: 'white', marginLeft: '5%' }}
      >
        {title}
      </Title>
    </div>
  );
};

export default FPTitle;
