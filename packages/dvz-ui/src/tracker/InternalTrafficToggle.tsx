import React from 'react';
import { Container, Header, Message, Segment } from 'semantic-ui-react';
import { useInternalTrafficBypass } from './useInternalTrafficBypass';

interface InternalTrafficToggleProps {
  redirectTo?: string;
}

const InternalTrafficToggle: React.FC<InternalTrafficToggleProps> = ({ redirectTo = '/' }) => {
  const { status, message } = useInternalTrafficBypass(redirectTo);
  const heading =
    status === 'success' ? 'Success' : status === 'error' ? 'Error' : 'Processing';

  const messageColor =
    status === 'success' ? 'green' : status === 'error' ? 'red' : 'blue';

  const messageIcon =
    status === 'success' ? 'check circle' : status === 'error' ? 'warning sign' : 'spinner';

  return (
    <Container as="div">
      <Segment textAlign="center" basic vertical>
        <Header as="h1" content={heading} />

         {status === 'success' && (
          <Message size="small" content="Redirecting to home page in 3 seconds..." />
        )}

       
      </Segment>

      <Segment vertical>
         <Message
         size="large"
          icon={messageIcon}
          color={messageColor}
          content={message}
        />

      </Segment>

    </Container>
  );
};

export default InternalTrafficToggle;
