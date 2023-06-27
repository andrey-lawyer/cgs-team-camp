import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Cell = styled('td')`
  text-align: center;
`;

export const ButtonDel = styled('button')`
  margin-left: ${(props) => props.theme.SPACES.spacing(6)};
  border-radius: ${(props) => props.theme.SPACES.spacing(5)};
  background-color: #e7626288;
`;

export const ButtonView = styled(Link)`
  border: 1px solid black;
  padding-left: ${(props) => props.theme.SPACES.spacing(3)};
  padding-right: ${(props) => props.theme.SPACES.spacing(3)};
  padding-top: ${(props) => props.theme.SPACES.spacing(1)};
  padding-bottom: ${(props) => props.theme.SPACES.spacing(1)};
  margin-left: ${(props) => props.theme.SPACES.spacing(3)};
  border-radius: ${(props) => props.theme.SPACES.spacing(5)};
  background-color: #778af287;
`;
