import React from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

const Loading = () => {
  return (
    <Segment className="h-screen w-screen">
      <Dimmer active inverted>
        <Loader size="large" active inline="centered" inverted/>
      </Dimmer>
    </Segment>
  )
}

export default Loading;