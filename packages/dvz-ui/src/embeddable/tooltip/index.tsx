import React from "react";
import { Icon, Popup } from 'semantic-ui-react'

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

const Tooltip = ({

                     "data-description": description = ""
                 }) => {


    return <Popup className="title-popup" size={"mini"} offset={[-10,0]} content={decodeContent(description)} trigger={<Icon  name='question circle' />} />
}


export default Tooltip
