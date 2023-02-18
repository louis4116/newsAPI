import React from 'react';
import { useDispatch } from 'react-redux';
import { firebaseDataAction } from '../../store/firebaseData-slice';
import { deleteFirebaseData } from '../../server/firestore';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import RemoveIcon from '@mui/icons-material/Remove';
import useAccountAuth from '../../custom-hook/useAccountAuth';
import classes from "./personalnews.module.css";
const PersonalNews = (props) => {
    const {name,title,url,urlToImage,description,publishedAt}=props;
    const {currentUser}=useAccountAuth();
    const dispatch=useDispatch();

    const naviToNEWS=()=>{
      const w=window.open("about:blank","_blank");
      w.location=(url);
    }
    const removeHandler=(e)=>{
      e.stopPropagation();
      dispatch(firebaseDataAction.deleteNews(name))
      deleteFirebaseData({idName:name,uid:currentUser.uid});
    }
  
  return (
    <div className={classes.personalNews} onClick={naviToNEWS}>
      <div className={classes.img}>
        <LazyLoadImage 
        src={urlToImage}
        width={180}
        height={108}
        effect="blur"
        />
      </div>
    <div className={classes.detail}>
    <h3>{title}</h3>
    <span className={classes.time}>{publishedAt}</span>
    <p className={classes.p}>{description}</p>
    </div>
    <button className={classes.button} onClick={removeHandler}><RemoveIcon /></button>
    </div>
  )
}

export default PersonalNews