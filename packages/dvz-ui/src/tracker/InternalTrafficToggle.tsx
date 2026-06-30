import React from 'react';
import { Button, Container, Header, Message, Segment } from 'semantic-ui-react';
import { useInternalTrafficBypass } from './useInternalTrafficBypass';

const InternalTrafficToggle: React.FC = () => {
  const { isEnabled, expiresAt, toggle } = useInternalTrafficBypass();

  return (
    <Container as="div">
      <Segment textAlign="center" basic vertical>
        <Header as="h1" content="Google Analytics Bypass" />
      </Segment>

      <Segment vertical>
        <Message color={isEnabled ? 'green' : 'blue'}>
          <Message.Header>
            {isEnabled ? 'Internal traffic bypass is ON' : 'Internal traffic bypass is OFF'}
          </Message.Header>
          <p>
            {isEnabled
              ? 'Your visits are excluded from GA4. Disable to resume normal tracking.'
              : 'Your visits are being tracked in GA4. Enable to exclude internal traffic.'}
          </p>
          {isEnabled && expiresAt && (
            <p style={{ marginTop: '0.5em', fontSize: '0.9em', opacity: 0.8 }}>
              Cookie expires: {expiresAt.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
        </Message>
        <Button
          color={isEnabled ? 'red' : 'green'}
          onClick={toggle}
          content={isEnabled ? 'Disable bypass' : 'Enable bypass'}
        />
      </Segment>
    </Container>
  );
};

export default InternalTrafficToggle;
