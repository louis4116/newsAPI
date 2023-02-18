import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./data-slice";
import firebaseDataSlice from "./firebaseData-slice";

const store =configureStore({
    reducer:{
        data:dataSlice.reducer,
        firebaseData:firebaseDataSlice.reducer 
    }
});

export default store;