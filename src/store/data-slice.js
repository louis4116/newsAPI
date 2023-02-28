import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState ={fetchContent:[],totalResult:""};

export const fetchNewsData=createAsyncThunk("data/fetchNewsData",async({input,now,yesterday})=>{
    console.log(input,now,yesterday)
    let fetchData
    if(!yesterday){
        fetchData= await fetch(`https://newsapi.org/v2/everything?q=${input}&from=${now}&to=${now}&sortBy=relevancy&apiKey=${process.env.REACT_APP_API_KEY}`,{
            method:"GET"
        });
    }else{  
         fetchData= await fetch(`https://newsapi.org/v2/everything?q=${input}&from=${yesterday}&to=${now}&sortBy=relevancy&apiKey=${process.env.REACT_APP_API_KEY}`,{
            method:"GET"
        });
    }
    
    const fetchResult= await fetchData.json();
    console.log(fetchResult)
    return fetchResult;
})


const dataSlice=createSlice({
    name:"data",
    initialState,
    reducers:{
        initialReducer(state,action){
            return initialState
        },
    },
    extraReducers:{
        [fetchNewsData.pending]:(state,action)=>{
          console.log(action.payload)
        },
        [fetchNewsData.fulfilled]:(state,action)=>{
            const totalResult=action.payload.totalResults
            const fetchItem=action.payload.articles;
            state.totalResults=totalResult;
            for(let i=0;i<fetchItem.length;i++){
                state.fetchContent.push(fetchItem[i])
            }
        },
        [fetchNewsData.rejected]:(state,action)=>{
            console.log(action.payload)
        }
    }
})


export const dataAction=dataSlice.actions;

export default dataSlice;