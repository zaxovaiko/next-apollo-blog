import { Flex, Image, Text } from '@mantine/core';
import { UserThumbnailFragment } from 'generated/client';
import Link from 'next/link';
import React from 'react';

export const PostAuthorCard = ({ user }: { user: UserThumbnailFragment }) => {
  return (
    <Flex sx={{ alignItems: 'center' }}>
      <Image src={user.avatar} width={60} height={60} radius="xl" />
      <Link
        href={`/users/${user.uid}`}
        passHref
        legacyBehavior
        style={{ cursor: 'pointer' }}
      >
        <Text ml="md" fw="bold" size="lg" sx={{ cursor: 'pointer' }}>
          {user.displayName}
        </Text>
      </Link>
    </Flex>
  );
};
