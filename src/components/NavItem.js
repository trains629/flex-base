import React from 'react';
import classNames from "classnames";

export default ({children,onClick,className:cl="",linkClass=""})=><li 
  className={classNames("nav-item",cl)}>
    <a className={classNames("nav-link",linkClass) } onClick={(e)=>{
      if(typeof onClick === "function")onClick(e);
    }}>{children}</a>
</li>;