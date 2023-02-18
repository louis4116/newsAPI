import React from 'react';
import Login from '../../components/login/Login';
import classes from "./loginpage.module.css";
const LoginPage = () => {
  return (
    <div className={classes.login}><Login /></div>
  )
}

export default LoginPage