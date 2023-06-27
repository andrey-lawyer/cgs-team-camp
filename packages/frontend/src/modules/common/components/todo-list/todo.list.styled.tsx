import styled from 'styled-components';

export const Table = styled.table`
  padding-top: ${(props) => props.theme.SPACES.spacing(5)};
`;

export const List = styled.ul`
  padding-top: ${(props) => props.theme.SPACES.spacing(3)};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.SPACES.spacing(3)};
`;
export const Item = styled.li`
  padding: ${(props) => props.theme.SPACES.spacing(2)};
  background-color: #79bdeb;
  border-radius: ${(props) => props.theme.SPACES.spacing(3)};
`;
