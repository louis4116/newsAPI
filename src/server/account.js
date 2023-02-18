import { createUserWithEmailAndPassword,updateProfile, signInWithEmailAndPassword} from "firebase/auth";
import { auth, storage } from "./server";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Swal from "sweetalert2";



export const creatAccount=async({username,email,password})=>{
   console.log(username,email,password)
    try{
        const {user}=await createUserWithEmailAndPassword(auth,email,password);
        await updateProfile(user, {
            displayName: username
          })
    }catch(e){
        console.log(e);
    }
};



export const loginAccount=async({email,password})=>{
    
    try{
       await signInWithEmailAndPassword(auth,email,password);
    }catch(e){
       throw Error( Swal.fire({
            title: "失敗!!",
            text: `${e}`,
            icon: "error",
            confirmButtonText: "關閉",
          }))
        
    }
}




export const uploadImgFC=async({photo,currentUser})=>{
  
    try{
        const fileRef=ref(storage,currentUser.uid+".png");
        await uploadBytes(fileRef,photo);
        const photoURL=await getDownloadURL(fileRef);

        updateProfile(currentUser,{photoURL});
        return photoURL
    }catch(e){
        console.log(e)
    }
}