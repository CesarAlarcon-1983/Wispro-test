import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from 'react-bootstrap/Button';

const DashboardContainer = styled.div`
  padding: 50px 0;
`;

const DashboardTabs = styled(motion.ul)`
  display: flex;
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid white;
`;

const DashboardTab = styled(motion.li)`
  background: transparent;
  border: none;
  color: white;
  width: auto;
  padding: 20px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  margin-right: 10px;
  font-size: 16px;
`;

const Underline = styled(motion.div)`
  position: absolute;
  bottom: -2px;
  width: 100%;
  background: #5CB958;
  height: 3px;
`;

const DashboardContent = styled.div`
  padding: 50px 0;
`;

const DashboardButton = styled(Button)`
  margin-bottom: 20px !important;
  font-size: 16px;
`;

const DashboardList = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 20px;
`;

const DashboardListItem = styled.li`
  color: white;
  display: flex;
  width: 50%;
  justify-content: space-between;
  margin-bottom: 10px;
  border-bottom: 1px solid white;
`;

const DashboardIconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInput = styled.input`
    border: none;
    width: 80%;
    height: 100%;
    background: none;
    font-size: 20px;
    padding-left: 10px;
    outline: none;
    color: white;
    caret-color: white;
    z-index: 1;
    position: relative;
    height: 50px;
    margin-bottom: -2px;

    &::placeholder {
        opacity: 0;
    }

    ${props => props.editEnable && `
      border-bottom: 3px solid #5CB958;
    `}
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
`;

export {
  DashboardContainer,
  DashboardTabs,
  DashboardTab,
  Underline,
  DashboardContent,
  DashboardList,
  DashboardListItem,
  DashboardIconsContainer,
  UserInput,
  DashboardButton,
  ErrorMessage,
  IconButton
}