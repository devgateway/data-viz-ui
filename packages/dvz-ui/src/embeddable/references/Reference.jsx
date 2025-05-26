import React from "react";
import { Popup} from 'semantic-ui-react'
import {connect} from "react-redux";

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

const Reference = ({
                       "data-index": index = "",
                       "data-description": description = "",
                       "data-link": link = ""

                   }) => {

    return <Popup className="reference-popup" hoverable size={"mini"} offset={[-16, 0]} content={<div>

        <p>{decodeContent(description)}</p>
        <a href={link} target="_blank">{link}</a>
    </div>}
                  trigger={<a data-index={index} data-description={description} data-link={link} href={`#ref_${index}`} className={"wp-reference"}>{index}</a>}/>
}



const mapStateToProps = (state, ownProps) => {
    return {random: state.getIn(["embeddable", "random"])}
}

const mapActionCreators = {};
export default connect(mapStateToProps, mapActionCreators)(Reference)
