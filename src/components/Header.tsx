import React from 'react';
import { Container } from 'react-bootstrap';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <Container className="mt-4 mb-4">
    <h1>{title}</h1>
  </Container>
);

export default Header;
