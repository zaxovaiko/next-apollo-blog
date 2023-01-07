import { Grid } from '@mantine/core';
import { useRouter } from 'next/router';
import React from 'react';

import { useGetPostQuery } from '../../generated/client';
import { PageLoader } from '../../web/components/loaders/PageLoader';
import PostAuthorSection from '../../web/components/molecules/PostAuthorSection';
import PostContent from '../../web/components/organisms/PostContent';

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useGetPostQuery({
    variables: { input: { id: id as string } },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  if (loading) {
    return <PageLoader />;
  }

  if (error || !data?.post) {
    return <div>{error?.message ?? 'Something went wrong...'}</div>;
  }

  return (
    <>
      <Grid>
        <Grid.Col xs={9}>
          <PostContent post={data.post} />
        </Grid.Col>
        <Grid.Col xs={3}>
          <PostAuthorSection
            avatar={data.post.user.avatar}
            username={data.post.user.username}
            userPostTotal={2}
            userId={data.post.user.id}
          />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default PostPage;
