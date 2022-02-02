import React, { useEffect, useReducer, useState } from 'react';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';

const emailReducer=(state,action)=>{
  if(action.type==='USER_INPUT'){
    return {
      value:action.val,
      isValid:action.val.includes('@')
    }
  }
  if(action.type==='INPUT_BLUR'){
    return {
      value:state.value,
      isValid:state.value.includes('@')
    }
  }
  return {
    value:'',
    isValid:''
  }
}

const passwordReducer=(state,action)=>{
  switch(action.type){
    case 'USER_INPUT':
    return{
      value:action.val,
      isValid:action.val.trim().length>6
    }
    case'INPUT_BLUR':
    return {
      value:state.value,
      isValid:state.value.trim().length>6
    }    
    default:
      return {
        value:'',
        isValid:''
      }
  }
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value:'',
    isValid:''
  })

  const [passwordState,dispatchPassword]=useReducer(passwordReducer, {
    value:'',
    isValid:''
  })

const {isValid: emailIsValid}=emailState
const {isValid:passwordIsValid}=passwordState

 useEffect(()=> {
  const identifier=setTimeout(()=>{
    console.log('1');
    setFormIsValid(emailIsValid&& passwordIsValid)
  },500) 
  return ()=>{
    console.log('2');
    clearTimeout(identifier);
  };
},[emailIsValid,passwordIsValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT', val:event.target.value})
    // setEnteredEmail(event.target.value);
    // setFormIsValid(event.target.value.includes('@')&& passwordState.isValid)
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type:'USER_INPUT', val:event.target.value})
    // setFormIsValid(emailState.isValid && event.target.value.trim().length>6)
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR'})
    // setEmailIsValid(emailState.isValid.includes('@'));
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'INPUT_BLUR'})
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;