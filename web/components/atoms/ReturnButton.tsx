import { ActionIcon } from '@mantine/core';
import { IconArrowBackUp } from '@tabler/icons';
import Link from 'next/link';
import React from 'react';

const ReturnButton = () => {
  return (
    <ActionIcon component={Link} variant="outline" href="/">
      <IconArrowBackUp />
    </ActionIcon>
  );
};

export default ReturnButton;
