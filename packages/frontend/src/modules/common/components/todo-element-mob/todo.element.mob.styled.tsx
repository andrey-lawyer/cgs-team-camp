import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ButtonDel = styled('button')`
  border: 1px solid black;
  margin-left: ${(props) => props.theme.SPACES.spacing(3)};
  margin-right: ${(props) => props.theme.SPACES.spacing(3)};
  border-radius: ${(props) => props.theme.SPACES.spacing(5)};
  background-color: #911111;
  color: ${(props) => props.theme.COLORS.white};
  width: ${(props) => props.theme.SPACES.spacing(30)};
`;

export const ButtonView = styled(Link)`
  text-align: center;
  margin-right: ${(props) => props.theme.SPACES.spacing(3)};
  padding: 0;
  border: 1px solid black;
  padding-left: ${(props) => props.theme.SPACES.spacing(3)};
  padding-right: ${(props) => props.theme.SPACES.spacing(3)};
  padding-top: ${(props) => props.theme.SPACES.spacing(1)};
  padding-bottom: ${(props) => props.theme.SPACES.spacing(1)};
  margin-left: ${(props) => props.theme.SPACES.spacing(3)};
  border-radius: ${(props) => props.theme.SPACES.spacing(5)};
  background-color: #8f8fe8;
  margin-bottom: ${(props) => props.theme.SPACES.spacing(4)};
  width: ${(props) => props.theme.SPACES.spacing(30)};
`;
