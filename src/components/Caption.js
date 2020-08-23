import React from 'react';

export default function Caption({children,className}){
  let caption = children;
  if(caption === null || caption === undefined)return null;
  if(typeof caption === "number" && caption.toString() === "NaN")return null;
  return (<div className={className}>{caption}</div>); 
}