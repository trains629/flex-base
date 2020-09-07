import React, { useState,useEffect} from 'react';
import classNames from "classnames";

function Header(props){
  let {children,onClose} = props;
  return <header className="modal-card-head">
    <p className="modal-card-title">{children}</p>
    <button className="delete" onClick={onClose}></button>
  </header>;
}

function Footer({children}){
  return <footer className="modal-card-foot">
    {children}
  </footer>;
}

function Modal(props){
  let {title = "标题",footer,children,onClose,className} = props;
  const [show,setShow] = useState(props.show);
  useEffect(()=>{setShow(props.show);});
  const _onClose = (e)=>{
    if(typeof onClose === "function")onClose(false);
    setShow(false);
  }
  let style = {},styleContent = {};
  if(show){
    style["display"] = "block";
    styleContent["zIndex"] = 1200;
  }
  
  return <div className={classNames("modal",{"is-active":show})} style={style} >
    {show?<div className="modal-background" onClick={_onClose}/>:null}
    <div className={classNames("modal-card",className)} style={styleContent}>
      <Header onClose={_onClose}>{title}</Header>
      <section className="modal-card-body">
        {children}
      </section>
      {footer ? footer : null}
    </div>
  </div>;
}

export default {Modal,Footer,Header}