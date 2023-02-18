import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { db } from "../server/server";
import { collection,getDocs} from "firebase/firestore";

export const getFirebaseData=createAsyncThunk("firebaseData/getData",async({currentUser})=>{
    
    const data=await getDocs(collection(db,`${currentUser}`));
    let news=[];
    let id=[]
    data.forEach(doc=>{
        news.push(doc.data());
        id.push(doc.id);
       
    })
    
    return {news,id}
})


const firebaseDataSlice=createSlice({
    name:"firebaseData",
    initialState:{
        firebaseData:[],
        firebaseDataAmount:"",
    },
    reducers:{
        deleteNews(state,action){
            const oldItem=action.payload;
            state.firebaseData=state.firebaseData.filter((item)=>item.name!==oldItem);
            console.log(state.firebaseData)
            state.firebaseDataAmount--;
        }
    },
    extraReducers:{
        [getFirebaseData.pending]:(state,action)=>{
            console.log(action.payload);
        },
        [getFirebaseData.fulfilled]:(state,action)=>{
            const {id,news}=action.payload;
            let test=[]
            for(let i=0;i<news.length;i++){
                news[i].name=id[i]
                test.push(news[i])
            }
            state.firebaseDataAmount=news.length;
            state.firebaseData=test;  
           console.log(state.firebaseData)
        },
        [getFirebaseData.rejected]:(state,action)=>{
            console.log(action.payload);
        },
    }
})

export const firebaseDataAction=firebaseDataSlice.actions;

export default firebaseDataSlice