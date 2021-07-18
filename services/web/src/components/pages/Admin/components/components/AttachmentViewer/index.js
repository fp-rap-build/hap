import { Modal } from 'antd';

export default function Index({ visible, setVisible }) {
  const closeDocument = () => setVisible(false);

  return (
    <Modal title={'Review Document'} visible={visible} onCancel={closeDocument}>
      <h1>Hello world</h1>
    </Modal>
  );
}
