import { db } from "./server";
import { addDoc,collection,doc,deleteDoc} from "firebase/firestore";
import Swal from "sweetalert2";


export const setFirebaseDataTEST=async({
    title,description,publishedAt,url,urlToImage,currentUser})=>{
        
        try{
            await addDoc(collection(db,`${currentUser}`),{
            title:title,
            description:description,
            publishedAt:publishedAt,
            url:url,
            urlToImage:urlToImage
        });
        }catch(e){
            throw Error( Swal.fire({
                title: "失敗!!",
                text: `${e}`,
                icon: "error",
                confirmButtonText: "關閉",
              }))
        }
        
}



export const deleteFirebaseData=async({idName,uid})=>{
    try{
        await deleteDoc(doc(db,`${uid}`,`${idName}`));
    }catch(e){
        throw Error( Swal.fire({
            title: "失敗!!",
            text: `${e}`,
            icon: "error",
            confirmButtonText: "關閉",
          }))
    }
    
};