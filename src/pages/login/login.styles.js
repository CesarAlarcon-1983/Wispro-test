import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

const LoginContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 50px 0;
`;

const LoginForm = styled.form`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    align-items: flex-start;
    margin-bottom: 80px;

    @media(min-width: 760px) {
        margin-bottom: 0;
    }
`;

const LoginFormGroup = styled.div`
    width: 100%;
    position: relative;
    padding-bottom: 20px;
    margin-bottom: 10px;

    @media(min-width: 760px) {
        ${props => props.width && `
            width: ${props.width};
        `}
    }
`;

const LoginFormTitle = styled.h2`
    color: white;
    text-align: center;
    font-size: 40px;
    font-weight: 300;
`;

const LoginLabel = styled.label`
    position: absolute;
    top: calc(50% - 11px);
    left: 10px;
    font-size: 20px;
    transform: translateY(-50%);
    color: white;
    z-index: 2;
    transition: all .2s ease;
    pointer-events: none;
    margin: 0;
    font-weight: 300;
`;

const LoginInput = styled.input`
    border: none;
    border-bottom: 3px solid white;
    width: 100%;
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

    &:focus {
        padding-top: 20px;
        border-bottom: 3px solid #5CB958;

        & + label {
            top: 7px;
            font-size: 14px;

        }
    }

    &::placeholder {
        opacity: 0;
    }

    &:not(:placeholder-shown) {
        padding-top: 15px;

        + label {
            opacity: 1;
            top: 7px;
            font-size: 14px;
        }
    }
`;

const LoginErrorMessage = styled.span`
    color: red;
    font-size: 12px;
    position: absolute;
    bottom: 0;
    display: block;
`;

const LoginFormButtons = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const LoginFormButton = styled(Button)`
    margin-left: 10px;
    font-size: 14px;
`;

export {
  LoginContainer,
  LoginForm,
  LoginFormGroup,
  LoginFormTitle,
  LoginLabel,
  LoginInput,
  LoginFormButtons,
  LoginFormButton,
  LoginErrorMessage
}