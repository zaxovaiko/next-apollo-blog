import type { NextPage } from 'next';
import React from 'react';

import { useGetPostsQuery } from '../generated/client';
import PostsListLoader from '../web/components/loaders/PostsListLoader';
import PostsList from '../web/components/posts/PostsList';

const Home: NextPage = () => {
  const { data, loading, error } = useGetPostsQuery();

  if (loading) {
    return <PostsListLoader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <PostsList posts={data?.posts} />;
};

export default Home;
