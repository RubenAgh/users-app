import React from 'react';
import Logo from 'components/Logo';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ThemeButton from 'components/Header/ThemeButton';
import { getStyleFromProps } from 'utils/getStyleFromProps';

const Header = styled.header`
  display: flex;
  padding: 16px 32px;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => getStyleFromProps(props, 'headerBackground')};
  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

const Nav = styled.nav`
  display: flex;
  margin-right: 32px;
  a {
    text-decoration: none;
    color: ${(props) => getStyleFromProps(props, 'textColor')};
  }
  a:not(:last-of-type) {
    margin-right: 16px;
    @media (max-width: 400px) {
      margin-right: 0;
      margin-bottom: 8px;
    }
  }
  @media (max-width: 400px) {
    flex-direction: column;
    align-items: center;
    margin-right: 0;
    margin-bottom: 16px;
  }
`;

const HeaderComponent: React.FC<{}> = () => (
  <Header>
    <Link to="/" aria-label="Go to Home page">
      <Logo />
    </Link>
    <NavWrapper>
      <Nav>
        <Link to="/">Home</Link>
        <Link to="/user-list">User List</Link>
      </Nav>
      <ThemeButton />
    </NavWrapper>
  </Header>
);

export default HeaderComponent;