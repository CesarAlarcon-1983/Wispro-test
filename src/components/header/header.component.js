import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import {
  Header,
  HeaderContainer,
  HeaderNav,
  HeaderList,
  HeaderListItem,
  HeaderButtons,
  HeaderButton,
  HeaderUserMenu
} from './header.styles';

export default function AppHeader(props) {
  const {isAuth, activeUser, handleLogout} = props;
  const history = useHistory();

  const handleNavigation = () => {
    history.push("/dashboard");
  }

  return (
    <Header>
      <Container>
        <Row>
          <Col>
            <HeaderContainer>
              <HeaderNav>
                <HeaderList>
                  <HeaderListItem>
                    <Link to="/home">{'Home'}</Link>
                  </HeaderListItem>
                </HeaderList>
              </HeaderNav>
              {!isAuth &&
                <HeaderButtons>
                  <HeaderButton outline>
                    <Link to="/registro">{'Sign Up'}</Link>
                  </HeaderButton>
                  <HeaderButton>
                    <Link to="/login">{'Sign In'}</Link>
                  </HeaderButton>
                </HeaderButtons>
              }
              {isAuth &&
                <HeaderUserMenu title="Dropdown" id="collasible-nav-dropdown">
                  <HeaderUserMenu.Toggle variant="success" id="dropdown-basic">
                    {`Welcome ${activeUser?.nombre}`}
                  </HeaderUserMenu.Toggle>
                  <HeaderUserMenu.Menu>
                    <HeaderUserMenu.Item onClick={() => handleNavigation()}>{'Dashboard'}</HeaderUserMenu.Item>
                    <HeaderUserMenu.Divider />
                    <HeaderUserMenu.Item onClick={() => {handleLogout(activeUser.id)}}>{'Sign Out'}</HeaderUserMenu.Item>
                  </HeaderUserMenu.Menu>
                </HeaderUserMenu>
              }
            </HeaderContainer>
          </Col>
        </Row>
      </Container>
    </Header>
  )
}
