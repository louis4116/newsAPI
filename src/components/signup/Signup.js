import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm }  from "react-hook-form";
import classes from "./signup.module.css"
import { creatAccount } from '../../server/account';
const Signup = () => {
    const {register,handleSubmit,reset,watch,formState:{errors}}=useForm();
    const navigate=useNavigate();
    const submitHanlder=({username,email,password})=>{
        creatAccount({username:username,email:email,password:password})
        .then(()=>reset())
        .then(()=>navigate("/"))
        .catch((e)=>console.log(e))
    }
  return (
    <>
    
    <form className={classes.signup} onSubmit={handleSubmit(submitHanlder)}>
      <div className={classes['signup-container']}>
      <div className={classes['signup-content']}>
        <input
                type="text"
                id='username'
                placeholder="使用者名稱"
                className={classes['signup-content-input']}
                {...register("username", {
                  required: "請輸入使用者名稱",
                  minLength: {
                value: 1,
                message: "請輸入1至12位元名稱",
              },
              maxLength:{
                value:12,
                message:"請輸入1至12位元名稱"
              }
                })}
              />
            {errors.username && (
                <div className={classes.message}>
                  <p>{errors.username.message}</p>
                </div>
              )}
          
          <label htmlFor='userName' className={classes['signup-content-label']} >使用者名稱</label>
        
      </div>
      <div className={classes['signup-content']}>
      <input
              type="email"
              id='account-3'
              placeholder="帳號"
              className={classes['signup-content-input']}
              {...register("email", {
                required: "請輸入電子郵件",
                pattern: {
                  value:  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "請輸入正確的電子郵件",
                },
              })}
            />
          {errors.email && (
              <div className={classes.message}>
                <p>{errors.email.message}</p>
              </div>
            )}
        {/* <input type="email" id='account-3'  placeholder="帳號"  ref={accountRef} required/> */}
        <label htmlFor='account-3' className={classes['signup-content-label']} >帳號</label>
        
      </div>
      <div className={classes['signup-content']}>
        <input 
        type="password" 
        id='password-3' 
        className={classes['signup-content-input']} 
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
        {/* <input type="password" id='password-3'  className={classes['signup-content-input']} placeholder="密碼" ref={passwordRef} required/> */}
        <label htmlFor='password-3' className={classes['signup-content-label']}>密碼</label>
       
      </div>
      <div className={classes['signup-content']}>
      <input
            type="password" id='confirm_password'  className={classes['signup-content-input']} placeholder="密碼"
            {...register("confirm_password", {
            required: true,
            validate: (value) => {
            if (watch('password') !== value) {
            return "密碼不符合";
            }
            },
            })}/>
               {errors.confirm_password && (
              <div className={classes.message}>
                <p>{errors.confirm_password.message}</p>
              </div>
            )}
       <label htmlFor='confirm_password' className={classes['signup-content-label']}>確認密碼</label>     
      </div>
        <button className={classes['signup-button']} >註冊</button>
      </div>
    </form>
    </>
  )
}

export default Signup