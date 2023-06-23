import styled from 'styled-components';
export const Container = styled.div`
  margin: 0 auto;
  @media (max-width: 425px) {
    padding-left: ${(props) => props.theme.SPACES.spacing(4)};
    padding-right: ${(props) => props.theme.SPACES.spacing(4)};
  }
  @media (max-width: 425px) and (min-width: 768px) {
    padding-left: ${(props) => props.theme.SPACES.spacing(8)};
    padding-right: ${(props) => props.theme.SPACES.spacing(8)};
  }
  @media (min-width: 769px) {
    padding-left: ${(props) => props.theme.SPACES.spacing(12)};
    padding-right: ${(props) => props.theme.SPACES.spacing(12)};
  }
`;
