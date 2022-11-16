import { useRouter } from 'next/router';
import React from 'react';

import { Post, useGetPostQuery } from '../../generated/client';
import PostCard from '../../web/components/posts/PostCard';

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useGetPostQuery({
    variables: { input: { id: id as string } },
  });

  if (!data || loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <PostCard post={data.post as Post} />;
};

export default PostPage;
