import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AnimateSharedLayout } from 'framer-motion';
import DailyLoginChart from '../../components/charts/daily-logins';
import DailyRegistersChart from '../../components/charts/daily-registers';
import { getUsers, storeUser } from '../../services/storage.service';
import { editUser } from '../../services/users.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserMinus, faUserEdit, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import {
  DashboardContainer,
  DashboardTabs,
  DashboardTab,
  Underline,
  DashboardContent,
  DashboardList,
  DashboardListItem,
  DashboardIconsContainer,
  DashboardButton,
  UserInput,
  ErrorMessage,
  IconButton
} from './dashboard.styles';

export default function Dashboard() {
  const tabs = ['Usuarios', 'Loggeos último mes', 'Usuarios Registrados ultimo mes']
  const [isActive, setIsActive] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isUserListVisible, setIsUserListVisible] = useState(false);
  const [databaseState, setDatabaseState] = useState(getUsers());
  const [selectedUser, setSelectedUser] = useState(null)
  const [editEnabled, setEditEnabled] = useState(false)
  const [editedData, setEditedData] = useState();
  
  const handleClick = (index) => setIsActive(index);
  
  const CreateTabs = () => {
    let tabsItems = tabs.map((tab, index) => 
      <DashboardTab layout key={index} onClick={() => handleClick(index)}>
        {tab}
        {isActive === index && 
        <Underline 
          layoutId="outline"
          initial={false}
        >
        </Underline>}
      </DashboardTab>
    )

    return tabsItems;
  }

  const toggleUsersList = () => {
    setIsUserListVisible(!isUserListVisible);
  }

  const deleteUser = user => {
    if(!databaseState[user].token) {
      databaseState.splice(user, 1);
      storeUser(databaseState);
      setDatabaseState(getUsers())
      generateUsuariosRegistradosList(databaseState)
    } else {
      setErrorMessage('El usuario se encuentra loggeado y no se puede eliminar')
    }
  }
  const enableEditUser = user => {
    setEditEnabled(true);
    setSelectedUser(user);
  }

  const userDataChange = e => {
    setEditedData(e.target.value)     
  }

  const editUserData = id => {
    editUser(id, editedData);
    setDatabaseState(getUsers());
    setEditEnabled(false);
    setSelectedUser(null);
  }

  const cancelEdit = (user, index) => {
    setEditEnabled(false);
    setSelectedUser(null);
    document.getElementById(index).value = user;
  }

  const generateUsuariosRegistradosList = (database) => {
    let usersList = database.map((user, index) => {
      return (
        <DashboardListItem key={index}>
          <UserInput id={index} type='text' editEnable={editEnabled && selectedUser === index} readOnly={!editEnabled && selectedUser !== index} defaultValue={user.nombre} onChange={e => {userDataChange(e, index)}}/>
          <DashboardIconsContainer>
            {!editEnabled&&
              <>
                <IconButton onClick={() => deleteUser(index)}>
                  <FontAwesomeIcon icon={faUserMinus} size="lg" />
                </IconButton>
                <IconButton onClick={() => enableEditUser(index)}>
                  <FontAwesomeIcon icon={faUserEdit} size="lg" />
                </IconButton>
              </>
            }
            {editEnabled&&selectedUser===index&&
              <>
                <IconButton onClick={() => {cancelEdit(user.nombre, index)}}>
                  <FontAwesomeIcon icon={faTimes} size="lg" color="#f63" />
                </IconButton>
                <IconButton onClick={() => {editUserData(user.id)}}>
                  <FontAwesomeIcon icon={faCheck} size="lg" color="#5CB958" />
                </IconButton>
              </>
            }
          </DashboardIconsContainer>
        </DashboardListItem>
      )
    })

    return usersList
  }

  return (
    <DashboardContainer>
      <Container>
        <Row>
          <Col>
            <AnimateSharedLayout>
              <DashboardTabs>
                {CreateTabs()}
              </DashboardTabs>
            </AnimateSharedLayout>
            <DashboardContent>
              {isActive === 0 &&
                <>
                  <DashboardButton variant="success" onClick={toggleUsersList}>{isUserListVisible ? 'Ocultar lista de Usuarios' : 'Mostrar lista de Usuarios'}</DashboardButton>
                  {isUserListVisible &&
                    <>
                      <DashboardList>
                        {generateUsuariosRegistradosList(databaseState)}
                      </DashboardList> 
                      {errorMessage && 
                        <ErrorMessage>{errorMessage}</ErrorMessage>
                      }
                    </>
                  }
                </>
              }
              {isActive === 1 &&
                <DailyLoginChart/>
              }
              {isActive === 2 &&
                <DailyRegistersChart />
              }
            </DashboardContent>
          </Col>          
        </Row>
      </Container>
    </DashboardContainer>
  )
}