import { db } from "./server";
import { addDoc,collection,doc,deleteDoc} from "firebase/firestore";



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
            alert(e)
        }
        
}



export const deleteFirebaseData=async({idName,uid})=>{
    await deleteDoc(doc(db,`${uid}`,`${idName}`));
};