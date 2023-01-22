import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
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
        // MockerProvider requires defining __typename for each type
        __typename: 'Query',
        posts: [
          {
            __typename: 'Post',
            id: 1,
            title: 'Mocked title',
            content: 'Mocked content',
            previewImage: 'https://via.placeholder.com/150',
            createdAt: new Date(),
            user: {
              __typename: 'User',
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
    await mockRouter.push('/');

    render(
      <MockedProvider mocks={mocks} addTypename>
        <Home />
      </MockedProvider>,
    );

    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(await screen.findByText('Mocked title')).toBeInTheDocument();
    expect(await screen.findByText('mocked')).toBeInTheDocument();
  });
});
