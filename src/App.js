import React,{ Suspense } from 'react';
import { Route,Routes } from 'react-router-dom';
import classes from './App.module.css';
import Header from './components/header/Header';
import Spinner from './components/spinner/Spinner';
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

const Home=React.lazy(()=>import("./pages/home/Home"));
const Login=React.lazy(()=>import("./pages/login/LoginPage"));
const Signup=React.lazy(()=>import("./pages/signup/SignupPage"));
const Personal=React.lazy(()=>import("./pages/personal/PersonalPage"))

function App() {
  
  return (
    <div className={classes.app}>
      <Header />
  <Suspense fallback={<Spinner />}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/personal" element={<Personal />}/>
    </Routes>
  </Suspense>
    </div>
  );
}

export default App;
