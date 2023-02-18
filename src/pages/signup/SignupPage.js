import React from 'react';
import Signup from '../../components/signup/Signup';
import classes from "./signuppage.module.css";
const SignupPage = () => {
  return (
    <div className={classes.signupPage}><Signup /></div>
  )
}

export default SignupPage