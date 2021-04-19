import styled from 'styled-components';

const ModalContainer = styled('div')`
  width: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ModalContainer;
