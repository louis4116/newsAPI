import { useState } from "react";
import { MoonLoader } from "react-spinners";
import classes from "./spinner.module.css"


const Spinner = () => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("gray");
  
    return (
      <div className={classes["sweet-loading"]}>
        <MoonLoader
          color={color}
          
          loading={loading}
          cssOverride={{ 
          display: "block",
          margin: "0 auto",
          borderColor: "red", }}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
}

export default Spinner