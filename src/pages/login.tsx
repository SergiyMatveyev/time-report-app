import { ChangeEvent, FormEvent, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/auth.functions';
import { validateText, validatePassword } from '../utils/form.functions';

export const Login = (): JSX.Element => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [validatedForm, setValidatedForm] = useState(false);
  const [validatedName, setValidatedName] = useState(true);
  const [validatedPassword, setValidatedPassword] = useState(true);
  const [formTouched, setFormTouched] = useState(false);
  const [serverResponse, setServerResponse] = useState('Success');

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = event.currentTarget;

    if (
      form.checkValidity() === false ||
      !validatedName ||
      !validatedPassword
    ) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidatedForm(true);

    if ((userName.trim() !== '', password.trim() !== '')) {
      login(userName, password).then(serverUserResponse => {
        setServerResponse(serverUserResponse.message);
        if (serverUserResponse.message === 'Success') {
          navigate('/');
        }
      });
    }
  };

  const onChangeName = (event: ChangeEvent<HTMLInputElement>): void => {
    const isNameValid = validateText(event.target.value);
    setValidatedName(isNameValid);
    if (isNameValid) setUserName(event.target.value);
    if (!formTouched) setFormTouched(true);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    const isPasswordValid = validatePassword(event.target.value);
    setValidatedPassword(isPasswordValid);
    if (isPasswordValid) setPassword(event.target.value);
    if (!formTouched) setFormTouched(true);
  };

  return (
    <Container className="pt-5">
      <Row className="pt-5">
        <Col xs={12}>
          <h1 className="text-center">Login</h1>
        </Col>
        <Col xs={12} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <Form
            noValidate
            validated={validatedForm}
            onSubmit={handleSubmit}
            className={'d-flex flex-column align-items-end'}
          >
            <Form.Group className="mb-3 w-100" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                onChange={onChangeName}
                placeholder="username"
                required
                className={
                  formTouched
                    ? validatedName === true
                      ? 'is-valid'
                      : 'is-invalid'
                    : ''
                }
              />
              {formTouched ? (
                validatedName === false ? (
                  <Form.Text className="text-danger">
                    Username can not be empty
                  </Form.Text>
                ) : null
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3 w-100" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={onChangePassword}
                required
                className={
                  formTouched
                    ? validatedPassword === true
                      ? 'is-valid'
                      : 'is-invalid'
                    : ''
                }
              />
              {formTouched ? (
                validatedPassword === false ? (
                  <Form.Text className="text-danger">
                    Password must be more then 6 chars
                  </Form.Text>
                ) : null
              ) : null}
            </Form.Group>
            <Button type="submit">Login</Button>
          </Form>
          {serverResponse !== 'Success' ? (
            <Alert variant={'danger'} className={'mt-3'}>
              {serverResponse}
            </Alert>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};
