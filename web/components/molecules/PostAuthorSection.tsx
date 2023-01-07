import { Card, Image, Text } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
type AuthorProps = {
  avatar: string;
  username: string;
  userPostTotal: number;
  userId: string;
};
const PostAuthorSection = ({
  avatar,
  username,
  userPostTotal,
  userId,
}: AuthorProps) => {
  return (
    <Card withBorder shadow="md" radius="sm" p="xs">
      <Image src={avatar} />
      <Link href={`/users/${userId}`} style={{ textDecoration: 'none' }}>
        <Text my="lg" fw="bold" size={16}>
          {username}
        </Text>
      </Link>
      <Text mb="sm">Total posts: {userPostTotal}</Text>
    </Card>
  );
};
export default PostAuthorSection;
