import React from 'react';
import CustomAvatar from './custom-avatar';
import { Text } from './text';

type Props = {
  name: string;
  url?: string;
  shape: 'circle' | 'square';
};

const SelectOptionWithAvatar = ({ url, name, shape }: Props) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <CustomAvatar shape={shape} name={name} src={url} />
      <Text>{name}</Text>
    </div>
  );
};

export default SelectOptionWithAvatar;
