import styled from 'styled-components';

export const ModalWindow = styled.div`
  padding: 20px;
  position: absolute;
  top: 30px;
  left: 50%;
  translate: -50%;
  z-index: 1000;
  background: linear-gradient(-225deg, #97bffc 0%, #b8dcff 48%, #6bbbff 100%);
  border-radius: 5px;
  max-width: calc(100vw - 18px);
  max-height: calc(100vh - 24px);
`;
