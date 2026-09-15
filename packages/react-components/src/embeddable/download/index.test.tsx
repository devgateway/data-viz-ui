// @vitest-environment jsdom
import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Download from './index';

describe('Download', () => {
  it('renders a button labeled Download', () => {
    render(<Download />);
    expect(screen.getByRole('button', { name: 'Download' })).toBeInTheDocument();
  });
});
