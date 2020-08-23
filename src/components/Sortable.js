import React,{Component,useRef} from 'react';
import ReactDOM from 'react-dom';
import {windowRect,offsetXYFromParent,addEvent,removeEvent,ceil} from "./Sortable.utils";

function ListGroupItem(props){
  let {children,style,onMouseDown,className,onDeleteItem,setValue,Item} = props;
  const itemNode = useRef(null);
  return <li className={className} style={style} ref={itemNode}>
    {Item ?<Item setValue={(value)=>{
      if(typeof setValue === "function")setValue(value);
    }}
    onMouseDown={(e)=>{
      if(typeof onMouseDown === "function")
        onMouseDown(e,windowRect(itemNode.current));
    }}
    onDeleteItem={()=>{
      if(typeof onDeleteItem === "function")onDeleteItem();
    }}>{children}</Item>:null}
  </li>;
}

export default class Sortable extends Component {
  state = {show : false,x:0,y:0,width:0,height:0,
    actionMode :""
  };
  myRef = React.createRef();
  mouseCount = 0;
  currentIndex = -1;
  itemSize = {width:0,height:0};

  addEvent(){
    this.mouseCount = 0;
    const thisNode = ReactDOM.findDOMNode(this);
    if (!thisNode)return ;
    const {ownerDocument} = thisNode;
    addEvent(ownerDocument,"mousemove", this.handleDrag);
    addEvent(ownerDocument,"mouseup", this.handleDragStop);
  }

  removeEvent(){
    this.mouseCount = 0;
    const thisNode = ReactDOM.findDOMNode(this);
    if (!thisNode || !thisNode.ownerDocument || !thisNode.ownerDocument.body) {
      throw new Error('<DraggableCore> not mounted on DragStart!');
    }
    const {ownerDocument} = thisNode;
    removeEvent(ownerDocument,"mousemove", this.handleDrag);
    removeEvent(ownerDocument,"mouseup", this.handleDragStop);
  }

  handleDragStart = (e)=>{
    e.stopPropagation();
    e.preventDefault();
    if (typeof e.button === 'number' && e.button !== 0) return false;
    this.addEvent();
    let {x,y} = this.getClentXY(e);
    this.startXY = {x,y};
  };

  checkRect(point,list){
    let {x,y,width,height} = point;
    let result = x>=0 && x<= width && y>=0 && y <= height;
    if(!result)return;
    const count = Array.isArray(list) ? list.length :0;
    if(count <=0)return;
    const len = height / count;
    if(len>0)return Math.floor(y / len);
  }

  getClentXY(e){
    const {current} = this.myRef;
    let {x,y} = offsetXYFromParent(e,current);
    let {width,height} = windowRect(current);
    return {x,y,width,height};
  }

  handleDrag= (e) => {
    e.stopPropagation();
    if(this.mouseCount<=1)return this.mouseCount++;
    let {onExchange,children} = this.props;
    let {x,y,width,height} = this.getClentXY(e);
    let newIndex = this.checkRect({x,y,width,height},children);
    if(typeof newIndex === "number" && this.currentIndex !== newIndex && children.length > 0){
      let item = children.splice(this.currentIndex,1);
      children.splice(newIndex,0,item[0]);
      if(typeof onExchange === "function")onExchange(children,this.currentIndex,newIndex);
      this.setItemValue(newIndex,false);
    }
    this.setState({show:true,x,y,width,height});
  };

  setItemValue(index = -1,width = 0 ,height = 0){
    this.currentIndex = index;  
    if(typeof width !== "number")return;
    this.itemSize = {width,height};
  }

  handleDragStop = (e) => {
    e.stopPropagation();
    this.removeEvent();
    this.setItemValue();
    this.startXY = null;
    this.setState({show:false,actionMode:""});
  };

  move(){
    let {show,x,y} = this.state;
    if(!show)return null;
    let {itemSize} = this;
    let {Item,children} = this.props;
    let rect = this.startXY;
    x = ceil(x - (rect ? (rect.x % itemSize.width) :0));
    y = ceil(y - (rect ? (rect.y % itemSize.height) :0));
    return <ListGroupItem className="flex-sortable-item" Item={Item}
      style={{"transform":`translate(${x}px,${y}px)`,...itemSize}} 
      >{children[this.currentIndex]}
    </ListGroupItem>;
  }

  render(){
    let {style,onDeleteItem,children,title,extend,Item,setItemValue} = this.props;
    return (<>
      {title || null}
      {this.move()}
      <ul className="list-group" ref={this.myRef} style={style}>
        {Array.isArray(children) ?children.map((item,index)=>{
          let b = index === this.currentIndex;
          let {actionMode = ""} = this.state; 
          let key = `li${index+1}${b ? "b":""}${actionMode}`;
          return b ? <li className="list-group-item" key={key} 
            style={{"border": "2px dashed #abdfa1",...this.itemSize}}></li> : 
            <ListGroupItem className="list-group-item" Item={Item} key={key} 
              index={index}
              setValue={(value)=>{
                if(typeof setItemValue === "function")
                  setItemValue(value,index);
              }}
              onMouseDown={(e,rect)=>{
                this.handleDragStart(e);
                let {height,width} = rect;
                this.setItemValue(index,width,height);
              }}
              onDeleteItem={()=>{
                this.setItemValue();
                if(index <0 || index >= children.length)return;
                children.splice(index,1);
                onDeleteItem(children,index);
                this.setState({show:false,actionMode:`d${index}`});
              }}
            >{item}</ListGroupItem>;
        }):null}
      </ul>
      
      {extend || null}
    </>);
  }
}