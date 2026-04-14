import React from "react";
import { Icon, Tooltip } from '@devgateway/ui'

const decodeContent=(content) => {
    let result;
   try {
      result = decodeURIComponent(content)
   }  catch(err) {
      result = content
      console.error('error occurred decoding content:' + content )
    }
    return result
}

const TooltipComponent = ({
                     "data-description": description = ""
                 }) => {

    return (
      <Tooltip content={decodeContent(description)} className="title-popup">
        <Icon name="help-circle" />
      </Tooltip>
    );
}


export default TooltipComponent
