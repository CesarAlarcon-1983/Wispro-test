import styled from "styled-components";
import Dropdown from 'react-bootstrap/Dropdown';

const Header = styled.div``;

const HeaderContainer = styled.div`
   display: flex;
   justify-content: flex-end;
   padding: 20px 0;
`;

const HeaderNav = styled.nav`
`;

const HeaderList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const HeaderListItem = styled.li`
  margin-left: 20px;

  a {
    text-decoration: none;
    color: white;
    outline: none;
    font-size: 16px;

    &:visited,
    &:hover,
    &:focus-visible,
    &:active {
      text-decoration: none;
      outline: none;
    }
  }

`;

const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  margin-left: 40px;
`;

const HeaderButton = styled.button`
  height: 30px;
  width: 100px;
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

  &:last-child {
    margin-left: 20px;
  }

  ${props => props.outline &&` 
    background: transparent;
    color: white;
  `}
`;

const HeaderUserMenu = styled(Dropdown)`
  margin-left: 20px;
  a, button {
    font-size: 16px;
  }
`;

export {
  Header,
  HeaderContainer,
  HeaderNav,
  HeaderList,
  HeaderListItem,
  HeaderButtons,
  HeaderButton,
  HeaderUserMenu
}