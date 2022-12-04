import { Loader } from '@mantine/core';
import React from 'react';

import { Post, useGetPostCommentsQuery } from '../../../generated/client';

export const PostCommentsList = ({ id }: { id: Post['id'] }) => {
  const { data, loading, error } = useGetPostCommentsQuery({
    variables: { input: { id } },
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      {data?.post?.comments?.map(comment => (
        <div key={comment.id}>{comment.text}</div>
      ))}
    </>
  );
};
