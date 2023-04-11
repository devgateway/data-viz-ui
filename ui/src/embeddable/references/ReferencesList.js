import React, { useState, useEffect } from "react";
import {Container, Grid} from 'semantic-ui-react'
import {connect} from "react-redux";


const Reference = ({content, link, index}) => {
    return <Grid.Column>
        <Container id={"ref_"+index} className={"reference"}>
            <div className={"index"}>{index}</div>
            <div className={"content"} >{content}</div>
            <div className={"link"}>
                <a href={link} target="_blank">{link}</a>
            </div>
        </Container>
    </Grid.Column>
}

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
const References = ({
                        random,
                        editing = false,
                        "data-columns": cols = 3,
                        "data-height": height = 1000,
                        "data-flex-direction": flexDirection = "row"
                    }) => {
                        

    const style = {flexDirection}
    const [elements, setElements] = useState([])

    if (flexDirection == "column" && cols > 1) {
        style.height = height + "px"
    }

    useEffect(() => {
        try {
            //delay to allow all references to be loaded
            setTimeout(() => {
                const el = window.parent.document.querySelectorAll("div.wp-reference")
                setElements(el)
            }, 3000)            
        } catch(err) {
        }
    }) 
    
    const items = elements ? new Array(...elements):[]
    const unique = []
    items.forEach(item => {
        const found = unique.find(it => it.getAttribute("data-index") == item.getAttribute("data-index"))
        if(!found) {
            unique.push(item) 
        }
    })
        
    return (<Container className={"references list"}>
        {editing &&
            <div className="edit-mode-message"><p>No preview available. The full list of references will be displayed in the live page.</p></div>
        }
        <Grid fluid="true" stretched columns={cols} style={style}>
            {unique.sort((a, b) => {
                const indexA = a.getAttribute("data-index") ? parseInt(a.getAttribute("data-index")) : Number.POSITIVE_INFINITY
                const indexB = b.getAttribute("data-index") ? parseInt(b.getAttribute("data-index")) : Number.POSITIVE_INFINITY
                return indexA - indexB
            }).map(i => {
                return <Reference key={i.getAttribute("data-index")} index={i.getAttribute("data-index")}
                    content={decodeContent(i.getAttribute("data-description"))}
                    link={i.getAttribute("data-link")}></Reference>
            })}
        </Grid>
       
    </Container>)
}


const mapStateToProps = (state, ownProps) => {
    return {random: state.getIn(["embeddable", "random"])}
}

const mapActionCreators = {};
export default connect(mapStateToProps, mapActionCreators)(References)