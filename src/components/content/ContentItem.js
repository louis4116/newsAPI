import React from 'react'
import { setFirebaseDataTEST } from '../../server/firestore';
import { ControlPoint } from '@mui/icons-material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useAccountAuth from '../../custom-hook/useAccountAuth';
import classes from "./ContentItem.module.css"
const ContentItem = (props) => {

    const { 
    title,
    author,
    content,
    description,
    publishedAt,
    url,
    urlToImage,
    }=props;
    const {currentUser}=useAccountAuth();
 
  const hrefHandler=()=>{ 
    const w=window.open("about:blank","_blank");
    w.location=(url);
  }
  const addItemToFB=(e)=>{
    e.stopPropagation();
    setFirebaseDataTEST({
      title:title,
      description:description,
      publishedAt:publishedAt,
      url:url,
      urlToImage:urlToImage,
      currentUser:currentUser.uid
    })
  }
 
  return (
    
    <div className={classes["contentItem-container"]}  onClick={hrefHandler}>
      <div className={classes.img}>
        <LazyLoadImage 
        src={urlToImage}
        height={108}
        width={180}
        effect="blur"
        />
      </div>
      <div className={classes["contentItem-detail"]}>
        <h3>{title}</h3>
        <span className={classes["contentItem-time"]}>{publishedAt}</span>
        
        <p className={classes.p}>內容:{description}</p>
        </div>
        {!currentUser?"":<ControlPoint className={classes.button} onClick={addItemToFB}/>}
        
    </div>
    
   
  )
}

export default ContentItem