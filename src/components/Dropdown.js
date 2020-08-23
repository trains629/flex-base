import React,{useState,useEffect} from "react";
import classNames from "classnames";
import {addEvent,removeEvent} from "./Sortable.utils";

function Item({children,onClose,className="dropdown-item"}){
  return <a className={className} onMouseDown={(e)=>{onClose(e);}}>
    {children}</a>;
}

function Menu(props){
  let {onClose,children,className="dropdown-menu"} = props;
  let [show,setShow] = useState(props.show || false);
  const _onClose = ()=>{
    setShow(false);
    removeEvent(document,"mousedown", _onClose);
    if(typeof onClose === "function")onClose();
  }

  useEffect(()=>{
    if(props.show && !show){
      addEvent(document,"mousedown", _onClose);
      setShow(props.show);
    }
    return ()=>{
      removeEvent(document,"mousedown", _onClose);
    }
  },[props.show]);

  return <div className={classNames(className,show ? "show" : "")}>
    {children.map((item,i)=>item !== "-" ? <Item key={`dropdown${i}`} 
      onClose={(e)=>{
        e.stopPropagation();
        _onClose();
        if(typeof item.onClick === "function")
          item.onClick(e);
      }}>{item.caption}</Item> : <div className="dropdown-divider" 
        key={`dropdown${i}`}></div>)}
  </div>
}

function Dropdown (props){
  let {caption,children=[],className="dropdown",onClick,disabled,style ={},
    btnClassName="btn"} = props;
  let [show,setShow] = useState(false);
  const _onClose = ()=>{setShow(false)};
  let args = {"type":"button","className":classNames(btnClassName,"dropdown-toggle")};
  if(disabled)args["disabled"] = disabled;
  return (<div className={classNames(className,show ? "show" : "")} style={style}>
    <button {...args} onClick={(e)=>{
        if(typeof onClick !== "function")return setShow(true);
        let result = onClick(e);
        if((result || "").toString() !== "[object Promise]")return setShow(true);
        return result.then((list)=>{
          setShow(Array.isArray(list) && list.length ? true :false);
        })
      }}>
      {caption}
    </button>
    <Menu show={show} onClose={_onClose}>{children}</Menu>
  </div>)
}

export default {Dropdown,Menu};