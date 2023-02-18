import React,{useState,useEffect,useCallback} from 'react'
import useAccountAuth from '../../custom-hook/useAccountAuth';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { uploadImgFC } from '../../server/account';
import { useSelector } from 'react-redux';


import classes from "./personalinf.module.css"
const PersonalInf = () => {
    const [photo,setPhoto]=useState();
    const [show,setShow]=useState(false);
    const [nowPhoto, setNowPhoto] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
    const {currentUser}=useAccountAuth();
    const amount =useSelector(state=>state.firebaseData.firebaseDataAmount)
    const changeHandler=(e)=>{
      if(e.target.files[0]){
        setPhoto(e.target.files[0])
      };
    }
    
    const handleClick=()=>{
      console.log(photo)
      uploadImgFC({photo:photo,currentUser:currentUser})
      .then((res)=>setNowPhoto(res))
      .then(()=>setShow(false))  
      .catch(e=>alert(e));
    }
    const showHandler=()=>{
      if(show){
        setShow(false)
      }else{
        setShow(true)
      }
      
    }
   
    useEffect(()=>{
    
      if(currentUser?.photoURL){
        setNowPhoto(currentUser.photoURL)
      }
    },[currentUser])
  return (
    <div className={classes.personalInf}>
      <div className={classes.profile}>
        <LazyLoadImage 
        src={nowPhoto}
        className={classes.img}
        />
      </div>
      <div className={classes.detail}>
        {!show?"":<div className={classes["input-container"]}>
      <input type="file" className={classes.file} id={classes.input} onChange={changeHandler}/>
      <button className={classes.button} onClick={handleClick}>確認</button>
      </div>}
    <div className={classes.content}>
      <div className={classes.displayname}>{currentUser?.displayName}</div>
      <div className={classes.emailandNews}>
        <div>
          <div className={classes.div}>E-MAIL</div>
          <p className={classes.p}>{currentUser?.email}</p>
          </div>
        <div>
          <div className={classes.div}>NEWS</div>
          <p className={classes.p}>{amount}</p>
          </div>
      </div>
      <button className={classes.showButton} onClick={showHandler}>修改大頭貼</button>
    </div>
    
    </div>
    </div>
  )
}

export default PersonalInf