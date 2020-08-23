export function ceil(num){
  return Math.ceil(num * 100 +0.5)/100;
}

export function offsetXYFromParent(evt, offsetParent) {
    const isBody = offsetParent === offsetParent.ownerDocument.body;
    const offsetParentRect = isBody ? {left: 0, top: 0} : offsetParent.getBoundingClientRect();
    const x = evt.clientX + offsetParent.scrollLeft - offsetParentRect.left;
    const y = evt.clientY + offsetParent.scrollTop - offsetParentRect.top;
    return {x, y};
}

export function windowRect(node){
    // 返回相对于窗口左上角的相对坐标
    if(!node)return ;
    let {left,top,right,bottom} = node.getBoundingClientRect();
    let {pageXOffset,pageYOffset} = window;
    let width = right - left;
    let height = bottom - top;
    return {left:ceil(left+pageXOffset),top:ceil(top+pageYOffset),
        right:ceil(right+pageXOffset),bottom:ceil(bottom+pageYOffset),width:ceil(width),
    height:ceil(height)};
}

export function addEvent(el, event, handler) {
    if (!el) { return; }
    if (el.attachEvent) {
    el.attachEvent('on' + event, handler);
    } else if (el.addEventListener) {
    el.addEventListener(event, handler, true);
    } else {
    // $FlowIgnore: Doesn't think elements are indexable
    el['on' + event] = handler;
    }
}

export function removeEvent(el, event, handler) {
    if (!el) { return; }
    if (el.detachEvent) {
        el.detachEvent('on' + event, handler);
    } else if (el.removeEventListener) {
        el.removeEventListener(event, handler, true);
    } else {
        // $FlowIgnore: Doesn't think elements are indexable
        el['on' + event] = null;
    }
}
