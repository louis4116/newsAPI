import React from 'react'
import { useForm }  from "react-hook-form";
import { loginAccount } from '../../server/account';
import { useNavigate } from 'react-router-dom';
import classes from "./login.module.scss"

const Login = () => {
    const {register,handleSubmit,reset,formState:{errors}}=useForm();
    const navigate=useNavigate()
    const submitHanlder=({email,password})=>{
        loginAccount({email:email,password:password})
        .then(()=>navigate("/"))
        .catch((e)=>console.log(e))
    };
    
  return (
    <form className={classes.login} onSubmit={handleSubmit(submitHanlder)}>
      <div className={classes['login-container']}>
      <div className={classes['login-email-content']}>
      <input
              type="email"
              id='email'
              placeholder="帳號" 
              {...register("email", {
                required: "請輸入電子郵件",
                pattern: {
                  value:  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "請輸入正確的電子郵件",
                },
              })}/>
        <label htmlFor='email' className={classes['login-email-content-label']} >帳號</label>
        
      </div>
      <div className={classes['login-password-content']}>
        <input 
        type="password" 
        id='password' 
        placeholder="密碼"
        {...register("password",{
          required:"請輸入密碼",
          minLength: {
            value: 8,
            message: "請輸入至少8位數密碼",
          },
      })}/>
        {errors.password && (
              <div className={classes.message}>
                <p>{errors.password.message}</p>
              </div>
            )}
        <label htmlFor='password' className={classes['login-password-content-label']}>密碼</label>
      </div>
        <button className={classes['login-button']} >登入</button>
      </div>
    </form>
  )
}

export default Login