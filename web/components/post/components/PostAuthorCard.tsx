import { Box, Image, Text } from '@mantine/core';
import { UserThumbnailFragment } from 'generated/client';
import Link from 'next/link';
import React from 'react';

export const PostAuthorCard = ({ user }: { user: UserThumbnailFragment }) => {
  return (
    <Box>
      <Image
        src={user.avatar}
        color="cyan"
        width={160}
        height={160}
        radius="sm"
      />
      <Link
        href={`/users/${user.uid}`}
        style={{ textDecoration: 'none', cursor: 'pointer', color: 'inherit' }}
      >
        <Text my="lg" fw="bold" size={16} sx={{ cursor: 'pointer' }}>
          {user.displayName}
        </Text>
      </Link>
    </Box>
  );
};
