import { render, screen } from '@testing-library/react';
import React from 'react';

import Home from '../../pages';

import '@testing-library/jest-dom';

describe('Home', () => {
  it('renders a text', () => {
    render(<Home />);

    const text = screen.getByText('Mantine is successfully initalized');
    expect(text).toBeInTheDocument();
  });
});
