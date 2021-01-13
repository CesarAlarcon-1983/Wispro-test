import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  HomeContainer,
  HomeHero,
  HomeHeroTitle,
  HomeHeroContent,
  HomeHeroButtons,
  HomeHeroButton
} from './home.styles';

export default function Home(props) {
  return (
    <HomeContainer>
      <Container>
        <Row>
          <Col>
            <HomeHero>
              <HomeHeroTitle>{'Home Page'}</HomeHeroTitle>
              <HomeHeroContent>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}</HomeHeroContent>
              <HomeHeroButtons>
                <HomeHeroButton outline>
                    <Link to="/registro">{'Sign Up'}</Link>
                  </HomeHeroButton>
                  <HomeHeroButton>
                    <Link to="/login">{'Sign In'}</Link>
                  </HomeHeroButton>
              </HomeHeroButtons>
            </HomeHero>
          </Col>          
        </Row>
      </Container>
    </HomeContainer>
  )
}