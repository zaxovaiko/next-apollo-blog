import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';

import React from 'react';

import '@testing-library/jest-dom';

import { GetPostsDocument } from '../../generated/client';
import Home from '../../pages';


const mocks = [
  {
    request: {
      query: GetPostsDocument,
    },
    result: {
      data: {
        posts: [
          {
            id: 1,
            title: 'Mocked title',
            content: 'Mocked content',
            createdAt: new Date(),
            user: {
              avatar:
                'https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png',
              id: 1,
              username: 'mocked',
            },
          },
        ],
      },
    },
  },
];

describe('Home', () => {
  it('renders a text', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>,
    );

    expect(await screen.findByText('Loading')).toBeInTheDocument();
    await waitFor(async () =>
      expect(await screen.findByText('mocked')).toBeInTheDocument(),
    );
  });
});
