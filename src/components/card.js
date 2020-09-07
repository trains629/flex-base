import React from 'react';
import classNames from "classnames";

export default function Card({className,caption,children,footer,isCenter =false}) {
  return <div className={classNames(className,"card")}>
  {caption && (<div className="card-header">
    <p className={classNames("card-header-title",{"is-centered":isCenter})}>
      {caption}
    </p>
  </div>)}
  <div className="card-content">
    <div className="content">
      {children}
    </div>
  </div>
  {footer && (<div className="card-footer">
    {footer}
  </div>)}
</div>
}