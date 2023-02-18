import {useState,useEffect} from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../server/server';

const useAccountAuth = () => {
    const [currentUser,setCurrentUser]=useState({});
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setCurrentUser(user)
            }else{
                setCurrentUser(null)
            }
        });
      
    },[])
  return{
    currentUser
  }
}

export default useAccountAuth