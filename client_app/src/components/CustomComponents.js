import styled from 'styled-components';

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`;

const Input = styled.input`
  margin: 0.25em;
`;

const Footer = styled.footer`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
  font-weight: 700;
`;

const CustomComponents = {
  Button,
  Input,
  Footer,
};

export default CustomComponents;
