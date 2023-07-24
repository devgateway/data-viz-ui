import React from 'react'
import {Container} from 'semantic-ui-react'

import * as d3 from 'd3' // d3 plugin
import Parallax from './Parallax'

class ParallaxComponent extends React.Component {


    constructor(props) {
        super(props);

    }

    render() {

        return  <Parallax speed={-10}>
                    <div />
               </Parallax>
    }
}

export default ParallaxComponent
