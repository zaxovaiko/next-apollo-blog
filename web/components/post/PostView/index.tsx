import { Grid, Text, Title, Image, Badge, Button } from '@mantine/core';
import { useRouter } from 'next/router';
import React from 'react';
import { AddCommentArea } from 'web/components/comments/components/AddCommentArea';
import { PostCommentsList } from 'web/components/post/PostCommentsList';
import {
  useGetLazyPost,
  usePublishPost,
} from 'web/components/post/PostView/hooks';
import { PostAuthorCard } from 'web/components/post/components/PostAuthorCard';
import { PageLoader } from 'web/components/ui/PageLoader';

export const PostView = () => {
  const router = useRouter();
  const { id } = router.query;

  const { post, errorFetchingPost, isFetchingPost } = useGetLazyPost(
    id as string,
  );
  const { handlePublishClick, isPublishing } = usePublishPost(id as string);

  if (isFetchingPost || isPublishing) {
    return <PageLoader />;
  }

  if (errorFetchingPost || !post) {
    return <div>{errorFetchingPost?.message ?? 'Something went wrong...'}</div>;
  }

  return (
    <Grid>
      <Grid.Col xs={9}>
        <Title
          order={1}
          fw="bold"
          align="left"
          mb="md"
          sx={{ alignItems: 'center', display: 'flex' }}
        >
          {post.title}
          {post.isDraft && (
            <>
              <Badge ml={10} color="blue">
                Draft
              </Badge>
              <Button
                onClick={() => {
                  handlePublishClick().catch(console.error);
                }}
                variant="filled"
                color="green"
                ml="auto"
              >
                Publish
              </Button>
            </>
          )}
        </Title>
        {post.previewImage && (
          <Image height={200} src={post.previewImage} radius="md" mb="md" />
        )}
        <Text size="xl" color="gray.6">
          {post.content}
        </Text>
        {!post.isDraft && <AddCommentArea postId={id as string} />}

        <PostCommentsList id={post.id} />
      </Grid.Col>
      <Grid.Col xs={3}>
        <PostAuthorCard user={post.user} />
      </Grid.Col>
    </Grid>
  );
};
