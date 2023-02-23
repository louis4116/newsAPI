import React,{useState,useRef, useEffect} from 'react';
import { Search } from '@mui/icons-material';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { fetchNewsData,dataAction } from '../../store/data-slice';
import { auth } from '../../server/server';
import { useNavigate,NavLink,useLocation } from 'react-router-dom';
import useAccountAuth from '../../custom-hook/useAccountAuth';
import LogoutIcon from '@mui/icons-material/Logout';
import Calendar from '../calendar/Calendar';
import classes from "./header.module.css";
const Header = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [input,setInput]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {currentUser}=useAccountAuth();
  const {pathname}=useLocation();

  const signOutHandler=()=>{
    signOut(auth).then(()=>{
      console.log("成功")
    })
    .then(()=>navigate("/"))
    .catch((e)=>console.log(e))
  };
  
  const valueHandler=(e)=>{
    setInput(e.target.value);
    console.log("test")
  }
  
  const searchHandler=(e)=>{
    e.preventDefault();
    let date=startDate.getDate();
    let month=startDate.getMonth()+1;
    let year=startDate.getFullYear();
    let now=year+"-"+month+"-"+date;
    dispatch(fetchNewsData({input:input,now:now}))
    dispatch(dataAction.initialReducer())
    setInput("")
  }
  
  useEffect(()=>{
    let date=startDate.getDate();
    let month=startDate.getMonth()+1;
    let year=startDate.getFullYear();
    let now=year+"-"+month+"-"+date;
    dispatch(fetchNewsData({input:"台灣",now:now}));
    dispatch(dataAction.initialReducer());
    
  },[])

  const searchBar=(
    <>
    <div className={classes.headerSearch}>
    <Search className={classes.searchIcon} />
    <form onSubmit={searchHandler}>
    <input onChange={valueHandler} value={input}/>
    <Calendar date={startDate} setDate={setStartDate}/>
    </form>
    </div>
    </>
  )

  return (
    <div className={classes["header-container"]}>
      <div className={classes.headerLogo}>
       
      <NavLink to="/" className={classes.h1}>NewsAPI</NavLink>
      
      </div>
      <div className={classes.headerInput}>
        
         {pathname!=="/"?"":searchBar}
        
      </div>
      <div className={classes.headerPersonal}>
        {currentUser!==null?<h3>{currentUser.displayName}，您好</h3>:""}
        {currentUser!==null?<NavLink to="/personal">個人資訊</NavLink>:""}
       {currentUser!==null?<LogoutIcon className={classes.signout} onClick={signOutHandler}/>: <NavLink to="/login">登入</NavLink>}
        {currentUser!==null?"":<NavLink to="/signup">註冊</NavLink>}
        
        </div>
    </div>
  )
}

export default Header