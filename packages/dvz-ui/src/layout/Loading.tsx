import React from 'react';
import { Dimmer, Spinner, Segment } from '@devgateway/ui'

const Loading = () => {
  return (
    <Segment className="h-screen w-screen">
      <Dimmer active inverted>
        <Spinner size="large" active inline="centered" inverted/>
      </Dimmer>
    </Segment>
  )
}

export default Loading;