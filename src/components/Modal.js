import React, { useState,useEffect} from 'react';
import classNames from "classnames";

function Header(props){
  let {children,onClose} = props;
  return (<div className="modal-header">
    <h5 className="modal-title">{children}</h5>
    <button type="button" className="close" onClick={onClose}>
      <span>&times;</span>
    </button>
  </div>);
}

function Footer({children}){
  return <div className="modal-footer">
    {children}
  </div>;
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
  
  return <div className={classNames("modal","fade",show ? "show":"")} style={style} >
    <div className={classNames("modal-dialog",className)} style={styleContent}>
      <div className="modal-content">
        <Header onClose={_onClose}>{title}</Header>
        <div className="modal-body">
          {children}
        </div>
        {footer ? footer : null}
      </div>
    </div>
    {show ?<div key="show" className={`modal-backdrop fade show`} onClick={_onClose}/>:null}
  </div>;
}

export default {Modal,Footer,Header}