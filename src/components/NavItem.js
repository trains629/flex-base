import React from 'react';
import classNames from "classnames";
export default ({children,onClick,className:cl="",active})=><li 
  className={classNames(cl,{"is-active":active})}>
  <a onClick={(e)=>{if(typeof onClick === "function")onClick(e)}}>
    {children}
  </a>
</li>;