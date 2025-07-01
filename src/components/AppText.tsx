import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

const AppText: React.FC<TextProps> = ({ style, children, ...rest }) => {
  return (
    <Text style={[styles.default, style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
  },
});

export default AppText;
