import React, {useState } from 'react';
import classNames from "classnames";
import NavItem from "./NavItem";

export default function TabCard(props){
  let {children:groups = [],itemdata,className ="",headerclass,onClick,index:pi = 0} = props;
  const [index,setIndexValue] = useState(pi);
  let key = groups[index] && groups[index]["kind"] ?groups[index]["kind"]:`tab_${index}`;
  return (<div className={classNames(className,"card")}>
    <div className={classNames("card-header",headerclass)}>
      <ul className="nav nav-tabs card-header-tabs">
        {Array.isArray(groups)?groups.map(({caption,kind},id)=><NavItem 
          key={`${kind||"li"}_${id}`}
          onClick={(e)=>{
            setIndexValue(id);
            if(typeof onClick === "function")onClick(e,id);
          }}
          linkClass={index === id ? "active":""}
        >{caption}</NavItem>):null}
      </ul>
    </div>
    <div className="tab-content" key={key}>
      {Array.isArray(groups)?groups.map((item,id)=>{
        let s = index === id;
        return typeof itemdata === "function"?<div key={`tab_${id}`}
          className={classNames("tab-pane","fade",{show:s},{active:s})}>
          {itemdata(item,id)}</div>:null;  
      }):null}
    </div>
  </div>);
}