import React, { useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { getUsers, storeUser } from '../../services/storage.service';
import {
  RegistroContainer,
  RegistroForm,
  RegistroFormGroup,
  RegistroFormTitle,
  RegistroLabel,
  RegistroInput,
  RegistroFormButtons,
  RegistroFormButton,
  RegistroErrorMessage
} from './register.styles';

export default function Registro() {
  const formState = useRef({
    nombre: '',
    email: '',
    pass: '',
    r_pass: '',
    id: '',
    creation: '',
    token: null,
  })
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isEmailInDatabase, setIsEmailInDatabase] = useState(false);
  const [isValidPass, setIsValidPass] = useState(true);
  const history = useHistory();
 
  const onCancel= () => {
    history.push("/");
  }

  const onCreateUser = () => {
    if(!validateEmail()) {
      setIsValidEmail(false)
    }

    validatePass();

    if(!validateEmail() || !validatePass()) {
      return
    }

    let database = getUsers();
    let newUser = formState.current;
    let timestamp = Date.now();
    let newUserId;
    newUser.creation = timestamp;

    let userExists = database.filter(user => user.email === newUser.email);

    if(database.length > 0) {
      if(userExists.length > 0) {
        setIsEmailInDatabase(true)
        return
      } else {
        setIsEmailInDatabase(false)
        newUserId = database[database.length -1].id + 1;
        newUser.id = newUserId;
      }
    } else {
      newUserId = 1;
      newUser.id = newUserId
    }

    database.push(newUser);

    storeUser(database);
    history.push('/login');
  }

  const validatePass = () => {
    setIsValidPass(formState.current.pass === formState.current.r_pass);
    return formState.current.pass === formState.current.r_pass
  }

  const handleUserInput = e => {
    formState.current[e.target.name] = e.target.value
    enableSubmitButton();
    validatePass();
  }

  const validateEmail = () => {
    const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
    const regexTest = regex.test(formState.current.email);
    setIsValidEmail(regexTest);
    return regexTest
  }

  const enableSubmitButton = () => {
    let formValues = [formState.current.nombre, formState.current.email, formState.current.pass, formState.current.r_pass];
    
    if(formValues.some(value => value === '')) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }

  return (
    <RegistroContainer>
      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2}}>
            <RegistroForm>
              <RegistroFormGroup width="100%">
                <RegistroFormTitle>{'Registro de usuario'}</RegistroFormTitle>
              </RegistroFormGroup>
              <RegistroFormGroup width="47%">
                <RegistroInput onInput={handleUserInput} name={'nombre'} placeholder="Nombre"/>
                <RegistroLabel>{'Nombre'}</RegistroLabel>
              </RegistroFormGroup>
              <RegistroFormGroup width="47%">
                <RegistroInput onInput={handleUserInput} placeholder="Email" name={'email'}/>
                <RegistroLabel>{'Email'}</RegistroLabel>
                {!isValidEmail && 
                  <RegistroErrorMessage>{'Invalid email address'}</RegistroErrorMessage>
                }
              </RegistroFormGroup>
              <RegistroFormGroup width="47%">
                <RegistroInput onInput={handleUserInput} name={'pass'} placeholder="Password"/>
                <RegistroLabel>{'Password'}</RegistroLabel>
              </RegistroFormGroup>
              <RegistroFormGroup width="47%">
                <RegistroInput onInput={handleUserInput} name={'r_pass'} placeholder="Repeat Password"/>
                <RegistroLabel>{'Repeat Password'}</RegistroLabel>
                {!isValidPass && 
                  <RegistroErrorMessage>{'Las contraseñas no coinciden'}</RegistroErrorMessage>
                }
              </RegistroFormGroup>
              <RegistroFormGroup width="100%">
              {isEmailInDatabase && 
                  <RegistroErrorMessage>{'El usuario ya se encuentra registrado'}</RegistroErrorMessage>
                }
              </RegistroFormGroup>
              <RegistroFormGroup width="100%">
                <RegistroFormButtons>
                  <RegistroFormButton variant="danger" onClick={() => onCancel()}>{'Cancelar'}</RegistroFormButton>
                  <RegistroFormButton disabled={isButtonDisabled} variant="primary" onClick={() => onCreateUser()}>{'Crear Usuario'}</RegistroFormButton>
                </RegistroFormButtons>
              </RegistroFormGroup>
            </RegistroForm>
          </Col>          
        </Row>
      </Container>
    </RegistroContainer>
  )
}