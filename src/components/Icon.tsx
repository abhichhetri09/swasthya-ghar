import React from 'react';
import { Text, TextProps } from 'react-native';
import { getIcon, IconName } from '../constants/icons';

interface IconProps extends Omit<TextProps, 'children'> {
  name: IconName;
  size?: number;
  color?: string;
  focused?: boolean;
}

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  color = '#000000', 
  focused = false,
  style,
  ...props 
}) => {
  // Handle undefined or invalid icon names gracefully
  if (!name) {
    console.warn('Icon component received undefined or null name');
    return null;
  }
  
  const iconText = getIcon(name);
  const fontSize = focused ? size + 4 : size;

  return (
    <Text
      style={[
        {
          fontSize,
          color,
          textAlign: 'center',
        },
        style,
      ]}
      {...props}
    >
      {iconText}
    </Text>
  );
};
