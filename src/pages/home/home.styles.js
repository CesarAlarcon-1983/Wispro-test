import styled from 'styled-components';

const HomeContainer = styled.div`
  padding: 200px 0;
  height: 100vh;
`;

const HomeHero = styled.div`
`;

const HomeHeroTitle = styled.h2`
  text-align: center;
  color: white;
  font-size: 60px;
  font-weight: 500;
  margin: 0;
  margin-bottom: 20px;
`;

const HomeHeroContent = styled.div`
  color: white;
  font-size: 20px;
  width: 70%;
  margin: 0;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
  text-align: center;
`;

const HomeHeroButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HomeHeroButton = styled.button`
  height: 50px;
  width: 150px;
  border: 1px solid #5CB958;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  background: #5CB958;
  outline: none;
  transition: all .2s ease;
  margin: 0 20px;

  a {
    text-decoration: none;
    color: white;
    font-size: 16px;
    line-height: 30px;
    display: block;
    width: 100%;

    &:focus,
    &:active,
    &:visited,
    &:focus-within,
    &:hover {
      outline: none;
      text-decoration: none;
    }
  }

  ${props => props.outline &&` 
    background: transparent;
    color: white;
  `}
`;


export {
  HomeContainer,
  HomeHero,
  HomeHeroTitle,
  HomeHeroContent,
  HomeHeroButtons,
  HomeHeroButton
}