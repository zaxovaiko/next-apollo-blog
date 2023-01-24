import { Grid } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { useGetPostsQuery } from 'generated/client';
import { uniqBy } from 'lodash';
import React, { useEffect, useRef } from 'react';
import { PostCard } from 'web/components/post/components/PostCard';
import PostsListLoader from 'web/components/post/components/PostsListLoader';

export const PostsList = () => {
  const { data, loading, error, fetchMore } = useGetPostsQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: { input: { first: 5 } },
  });

  const listRef = useRef();

  const { ref, entry } = useIntersection<HTMLDivElement>({
    root: listRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting && data?.posts.pageInfo.hasMore && !loading) {
      fetchMore({
        variables: {
          input: {
            first: 5,
            after: data.posts.pageInfo.cursor,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }

          return {
            ...prev,
            posts: {
              ...prev.posts,
              edges: uniqBy(
                [...prev.posts.edges, ...fetchMoreResult.posts.edges],
                'node.id',
              ),
              pageInfo: fetchMoreResult.posts.pageInfo,
            },
          };
        },
      }).catch(console.error);
    }
  }, [entry?.isIntersecting, data, fetchMore, loading]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const posts = data?.posts.edges.map(e => e.node) ?? [];

  return (
    <>
      <Grid>
        {posts.map((post, i) => (
          <Grid.Col
            ref={posts.length - 2 === i ? ref : undefined}
            key={post.id}
            span={12}
            mb="md"
          >
            <PostCard post={post} />
          </Grid.Col>
        ))}
      </Grid>

      {loading && <PostsListLoader rows={5} />}
    </>
  );
};
