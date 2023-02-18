import React from 'react'


import Content from "../../components/content/Content"
import classes from "./home.module.css";
const Home = () => {
 
  return (
    <div className={classes.home}>
       
        <Content itemsPerPage={8}/>
    </div>
  )
}

export default Home