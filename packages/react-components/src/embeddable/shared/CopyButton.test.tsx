// @vitest-environment jsdom
import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import CopyButton from './CopyButton';

describe('CopyButton', () => {
  it('renders a button with the given text as its copy payload', () => {
    render(<CopyButton text="10.5281/zenodo.11234567" />);

    expect(screen.getByRole('button', { name: 'Copy' })).toHaveAttribute('data-copy-text', '10.5281/zenodo.11234567');
  });

  it('renders a custom label when given', () => {
    render(<CopyButton text="citation text" label="Copy citation" />);

    expect(screen.getByRole('button', { name: 'Copy citation' })).toBeInTheDocument();
  });

  it('ships an inline script that copies the button\'s own data-copy-text via the Clipboard API', () => {
    const { container } = render(<CopyButton text="10.5281/zenodo.11234567" />);

    const script = container.querySelector('script');
    expect(script?.innerHTML).toContain('navigator.clipboard.writeText');
    expect(script?.innerHTML).toContain('previousElementSibling');
    expect(script?.innerHTML).toContain('data-copy-text');
  });

  it('applies a custom className to the button', () => {
    render(<CopyButton text="x" className="my-copy-button" />);

    expect(screen.getByRole('button')).toHaveClass('my-copy-button');
  });
});
