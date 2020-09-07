import React, {useState } from 'react';
import classNames from "classnames";
import NavItem from "./NavItem";

export default function TabCard(props){
  let {children:groups = [],itemdata,className ="",headerclass,onClick,style,
    index:pi = 0} = props;
  const [index,setIndexValue] = useState(pi);
  let key = groups[index] && groups[index]["kind"] ?groups[index]["kind"]:`tab_${index}`;
  return (<div className={classNames(className,"card")} style={style}>
    <div className={classNames("card-header",headerclass)}>
      <div className="tabs is-boxed">
        <ul>
          {Array.isArray(groups)?groups.map(({caption,kind},id)=><NavItem 
            key={`${kind||"li"}_${id}`}
            onClick={(e)=>{
              setIndexValue(id);
              if(typeof onClick === "function")onClick(e,id);
            }}
            active={index === id}
          >
            <span className="icon is-small">
              <i className="far fa-file-alt"/>
            </span>
            <span>{caption}</span>
          </NavItem>):null}
        </ul>
      </div>
    </div>
    <div className="card-content" key={key}>
      {Array.isArray(groups)?groups.map((item,id)=>{
        let s = index === id;
        return typeof itemdata === "function"?<div key={`tab_${id}`}
          className={classNames("content",{"is-hidden":!s})}>
          {itemdata(item,id)}</div>:null;  
      }):null}
    </div>
  </div>);
}