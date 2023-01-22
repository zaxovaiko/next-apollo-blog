import { IconArrowBackUp } from '@tabler/icons';
import { useRouter } from 'next/router';
import React from 'react';

export const ReturnButton = () => {
  const { back } = useRouter();
  return (
    <IconArrowBackUp
      onClick={() => back()}
      style={{
        cursor: 'pointer',
      }}
    />
  );
};
