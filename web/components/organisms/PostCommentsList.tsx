import { Center, Loader } from '@mantine/core';
import React from 'react';

import { Post, useGetPostCommentsQuery } from '../../../generated/client';
import CommentCard from '../molecules/CommentCard';

export const PostCommentsList = ({ id }: { id: Post['id'] }) => {
  const { data, loading, error } = useGetPostCommentsQuery({
    variables: { input: { id } },
  });

  if (loading) {
    return (
      <Center pt="lg">
        <Loader />
      </Center>
    );
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      {data?.post?.comments?.map(comment => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </>
  );
};
