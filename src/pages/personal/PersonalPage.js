import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { getFirebaseData } from '../../store/firebaseData-slice';
import useAccountAuth from '../../custom-hook/useAccountAuth'
import PersonalNews from '../../components/personal/PersonalNews'
import PersonalInf from '../../components/personal/PersonalInf'
import classes from "./personalpage.module.css"

const PersonalPage = () => {

    const dispatch=useDispatch();
    const personalNews=useSelector(state=>state.firebaseData.firebaseData);
    const {currentUser}=useAccountAuth();
    useEffect(()=>{
     
        if(currentUser!==null){
          dispatch(getFirebaseData({currentUser:currentUser.uid}));
        }else{
          return
        }
        
      },[currentUser]);
      console.log(personalNews)
    
  return (
    <div className={classes.personalPage}>
      <div className={classes.personalInf}>
        <PersonalInf />
        </div>
        <div className={classes.personalNews}>
        { personalNews.map((item)=><PersonalNews 
        key={item.name}
        name={item.name}
        title={item.title} 
        url={item.url} 
        urlToImage={item.urlToImage} 
        description={item.description}
        publishedAt={item.publishedAt}
        />) }
        </div>
    </div>
  )
}

export default PersonalPage