import React, { useRef, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import {
  LoginContainer,
  LoginForm,
  LoginFormGroup,
  LoginFormTitle,
  LoginLabel,
  LoginInput,
  LoginFormButtons,
  LoginFormButton,
  LoginErrorMessage
} from './login.styles';

export default function Login(props) {
  const {handleLogin, isAuth} = props;
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [tryLogin, setTryLogin] = useState(false);
  const formState = useRef({
    email: '',
    pass: '',
  })
  const history = useHistory();
 
  const onCancel= () => {
    history.push("/");
  }

  useEffect(() => {
    if(isAuth) {
      history.push("/dashboard");
    }
  }, [isAuth, history])

  const handleUserInput = e => {
    formState.current[e.target.name] = e.target.value
    setTryLogin(false);
    enableSubmitButton();
  }

  const enableSubmitButton = () => {
    let formValues = [formState.current.email, formState.current.pass];
    
    if(formValues.some(value => value === '')) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }
  

  return (
    <LoginContainer>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <LoginForm>
              <LoginFormGroup width="100%">
                <LoginFormTitle>{'Iniciar Sesión'}</LoginFormTitle>
              </LoginFormGroup>
              <LoginFormGroup width="100%">
                <LoginInput type="email" placeholder="Email" name='email' onInput={handleUserInput}/>
                <LoginLabel>{'Email'}</LoginLabel>
              </LoginFormGroup>
              <LoginFormGroup width="100%">
                <LoginInput type="password" placeholder="Password" name='pass' onInput={handleUserInput}/>
                <LoginLabel>{'Password'}</LoginLabel>
              </LoginFormGroup>
              {!isAuth && tryLogin &&
                <LoginFormGroup width="100%">
                    <LoginErrorMessage>{'Datos de usuario invalidos'}</LoginErrorMessage>
                </LoginFormGroup>
              }
              <LoginFormGroup width="100%">
                <LoginFormButtons>
                  <LoginFormButton size="lg" variant="danger" onClick={() => onCancel()}>{'Cancelar'}</LoginFormButton>
                  <LoginFormButton disabled={isButtonDisabled} variant="primary"
                    onClick={() => {setTryLogin(true); handleLogin(formState.current)}}>{'Login'}</LoginFormButton>
                </LoginFormButtons>
              </LoginFormGroup>
            </LoginForm>
          </Col>          
        </Row>
      </Container>
    </LoginContainer>
  )
}