import { Image } from 'antd';

export default function ImageViewer({ imgLocation }) {
  return <Image width={600} src={imgLocation} />;
}
