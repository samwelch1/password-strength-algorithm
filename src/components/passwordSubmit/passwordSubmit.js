import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
  background:{
    backgroundColor: '#659DBD',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    fontFamily: 'Glacial Indifference',
    fontWeight: 'bolder',
    color: 'white',
  },
  button: {
    borderRadius: '8px',
    fontSize: 'calc(6px + 1vmin)',
    justifyContent: 'center',
    backgroundColor: 'white',
    color: 'black',
    type: 'submit',
  }
});

export default function PasswordSubmit(){
  const classes = useStyles();
  const [password, setPassword] = useState('');

  function validateForm() {
    return password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className={classes.background}>
      <h1>
        Password Entropy Calculator
      </h1>
      <h4>
        Please submit a sample password below.
      </h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password:  </Form.Label>

          <Form.Control
            type="user"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <NavLink to={{
          pathname: "/entropyInfo",
          aboutProps: {
            password: {password}
          }
        }}>
          <Button className={classes.button} disabled={!validateForm()}>
            Submit
          </Button>
        </NavLink>
      </Form>
    </div>
  );
};